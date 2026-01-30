import express from 'express';

import { requireAuth } from '../middlewares/authMiddleware.js';
import commentService from '../services/commentService.js';

const commentController = express.Router();

// POST /comments - Create comment
commentController.post('/', requireAuth, async (req, res) => {
  const { content, postId } = req.body;
  console.log('Creating comment for postId:', postId, 'by userId:', req.user.id);

  try {
    await commentService.createComment(content, parseInt(postId), req.user.id);
    res.redirect(`/posts/${postId}`);
  } catch (error) {
    res.redirect(`/posts/${postId}?error=${encodeURIComponent(error.message)}`);
  }
});

// GET /comments/:id/edit - Edit comment form
commentController.get('/:id/edit', requireAuth, async (req, res) => {
  try {
    const comment = await commentService.getCommentById(parseInt(req.params.id));
    if (!comment) {
      return res.status(404).render('error', { message: 'Comment not found' });
    }
    if (comment.authorId !== req.user.id) {
      return res.status(403).render('error', { message: 'Unauthorized' });
    }
    res.render('comments/edit', {
      title: 'Edit Comment',
      comment
    });
  } catch (error) {
    res.render('error', { message: error.message });
  }
});

// POST /comments/:id - Update comment
commentController.post('/:id', requireAuth, async (req, res) => {
  const { content, postId } = req.body;
  const id = parseInt(req.params.id);

  try {
    await commentService.updateComment(id, content, req.user.id);
    res.redirect(`/posts/${postId}`);
  } catch (error) {
    const comment = await commentService.getCommentById(id);
    res.render('comments/edit', {
      title: 'Edit Comment',
      error: error.message,
      comment: { ...comment, content }
    });
  }
});

// POST /comments/:id/delete - Delete comment
commentController.post('/:id/delete', requireAuth, async (req, res) => {
  const { postId } = req.body;

  try {
    await commentService.deleteComment(parseInt(req.params.id), req.user.id);
    res.redirect(`/posts/${postId}`);
  } catch (error) {
    res.redirect(`/posts/${postId}?error=${encodeURIComponent(error.message)}`);
  }
});

export default commentController;
