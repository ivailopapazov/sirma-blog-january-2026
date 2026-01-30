import postRepository from '../repositories/postRepository.js';

class PostService {
    async createPost(title, content, authorId) {
        return postRepository.create({
            title,
            content,
            authorId
        });
    }

    async getAllPosts() {
        return postRepository.findAll();
    }

    async getPostById(id) {
        return postRepository.findById(id);
    }

    async getPostsByAuthor(authorId) {
        return postRepository.findByAuthorId(authorId);
    }

    async updatePost(id, title, content, userId) {
        const post = await postRepository.findById(id);
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.authorId !== userId) {
            throw new Error('Unauthorized');
        }
        return postRepository.update(id, { title, content });
    }

    async deletePost(id, userId) {
        const post = await postRepository.findById(id);
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.authorId !== userId) {
            throw new Error('Unauthorized');
        }
        return postRepository.delete(id);
    }
}

export default new PostService();
