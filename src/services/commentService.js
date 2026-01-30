import commentRepository from '../repositories/commentRepository.js';

class CommentService {
    async createComment(content, postId, authorId) {
        return commentRepository.create({
            content,
            postId,
            authorId
        });
    }

    async getCommentById(id) {
        return commentRepository.findById(id);
    }

    async getCommentsByPost(postId) {
        return commentRepository.findByPostId(postId);
    }

    async updateComment(id, content, userId) {
        const comment = await commentRepository.findById(id);
        if (!comment) {
            throw new Error('Comment not found');
        }
        if (comment.authorId !== userId) {
            throw new Error('Unauthorized');
        }
        return commentRepository.update(id, { content });
    }

    async deleteComment(id, userId) {
        const comment = await commentRepository.findById(id);
        if (!comment) {
            throw new Error('Comment not found');
        }
        if (comment.authorId !== userId) {
            throw new Error('Unauthorized');
        }
        return commentRepository.delete(id);
    }
}

export default new CommentService();
