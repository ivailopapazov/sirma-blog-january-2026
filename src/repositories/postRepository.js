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
            where: { id }
        });
    },
    findAll() {
        return prisma.post.findMany();
    },
    findByAuthorId(authorId) {},
    update(id, updateData) { },
    delete(id) { },
}
