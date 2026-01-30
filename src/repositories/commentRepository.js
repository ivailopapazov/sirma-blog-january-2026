import { prisma } from '../config/prismaClient.js';

export default {
    findByEmail(email) {
        return prisma.comment.findUnique({
            where: { email }
        });
    },
    findByUsername(username) {
        return prisma.comment.findUnique({
            where: { username }
        });
    },
    create(userData) {
        return prisma.comment.create({
            data: userData
        });
    },
    findById(id) {
        return prisma.comment.findUnique({
            where: { id }
        });
    },
    findByPostId(postId) {
        return prisma.comment.findMany({
            where: { postId }
        });
    },
    update(id, updateData) {
        return prisma.comment.update({
            where: { id },
            data: updateData
        });
    },
    delete(id) {
        return prisma.comment.delete({
            where: { id }
        });
    },
}
