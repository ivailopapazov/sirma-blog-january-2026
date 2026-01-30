import express from 'express';
import { requireAuth } from '../middlewares/authMiddleware.js';
import postService from '../services/postService.js';

const postController = express.Router();

// GET /posts - List all posts
postController.get('/', async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.render('posts/index', {
            title: 'All Posts',
            posts
        });
    } catch (error) {
        res.render('error', { message: error.message });
    }
});

// GET /posts/new - New post form
postController.get('/new', requireAuth, (req, res) => {
    res.render('posts/new', { title: 'Create Post' });
});

// POST /posts - Create post
postController.post('/', requireAuth, async (req, res) => {
    const { title, content } = req.body;

    try {
        await postService.createPost(title, content, req.user.id);
        res.redirect('/posts');
    } catch (error) {
        res.render('posts/new', {
            title: 'Create Post',
            error: error.message,
            post: { title, content }
        });
    }
});

// GET /posts/:id - View post
postController.get('/:id', async (req, res) => {
    try {
        const post = await postService.getPostById(parseInt(req.params.id));
        if (!post) {
            return res.status(404).render('error', { message: 'Post not found' });
        }
        const isOwner = req.user && req.user.id === post.authorId;
        res.render('posts/show', {
            title: post.title,
            post,
            isOwner
        });
    } catch (error) {
        res.render('error', { message: error.message });
    }
});

// GET /posts/:id/edit - Edit post form
postController.get('/:id/edit', requireAuth, async (req, res) => {
    try {
        const post = await postService.getPostById(parseInt(req.params.id));
        if (!post) {
            return res.status(404).render('error', { message: 'Post not found' });
        }
        if (post.authorId !== req.user.id) {
            return res.status(403).render('error', { message: 'Unauthorized' });
        }
        res.render('posts/edit', {
            title: 'Edit Post',
            post
        });
    } catch (error) {
        res.render('error', { message: error.message });
    }
});

// POST /posts/:id - Update post
postController.post('/:id', requireAuth, async (req, res) => {
    const { title, content } = req.body;
    const id = parseInt(req.params.id);

    try {
        await postService.updatePost(id, title, content, req.user.id);
        res.redirect(`/posts/${id}`);
    } catch (error) {
        res.render('posts/edit', {
            title: 'Edit Post',
            error: error.message,
            post: { id, title, content }
        });
    }
});

// POST /posts/:id/delete - Delete post
postController.post('/:id/delete', requireAuth, async (req, res) => {
    try {
        await postService.deletePost(parseInt(req.params.id), req.user.id);
        res.redirect('/posts');
    } catch (error) {
        res.render('error', { message: error.message });
    }
});

export default postController;
