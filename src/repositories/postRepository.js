import { prisma } from "../config/prismaClient.js"

export default {
    findByEmail(email) { },
    findByUsername(username) { },
    create(postData) {
        return prisma.post.create({
            data: postData
        });
    },
    findById(id) { },
    findAll() {
        return prisma.post.findMany();
    },
    findByAuthorId(authorId) { },
    update(id, updateData) { },
    delete(id) { },
}
