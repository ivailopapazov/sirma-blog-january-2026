import { prisma } from "../config/prismaClient.js"

export default {
    findByEmail(email) {
        return prisma.post.findUnique({
            where: { email }
        });
    },
    findByUsername(username) {
        return prisma.post.findUnique({
            where: { username }
        });
    },
    create(postData) {
        return prisma.post.create({
            data: postData
        });
    },
    findById(id) {
        return prisma.post.findUnique({
            where: { id },
            include: {
                comments: true,
            }
        });
    },
    findAll() {
        return prisma.post.findMany({
            include: {
                author: true,
                comments: true,
            }
        });
    },
    findByAuthorId(authorId) {
        return prisma.post.findMany({
            where: { authorId }
        });
    },
    update(id, updateData) {
        return prisma.post.update({
            where: { id },
            data: updateData
        });
    },
    delete(id) {
        return prisma.post.delete({
            where: { id }
        });
    },
}
