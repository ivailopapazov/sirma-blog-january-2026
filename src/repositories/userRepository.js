import { prisma } from '../config/prismaClient.js';

export default {
    findByEmail(email) {
        return prisma.user.findUnique({
            where: { email }
        });
    },
    findByUsername(username) {
        return prisma.user.findUnique({
            where: { username }
        });
    },
    create(userData) {
        return prisma.user.create({
            data: userData
        });
    },
    findById(id) {
        return prisma.user.findUnique({
            where: { id }
        });
    },
    update(id, updateData) {
        return prisma.user.update({
            where: { id },
            data: updateData
        });
    },
    delete(id) {
        return prisma.user.delete({
            where: { id }
        });
    }
};
