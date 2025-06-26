import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCategories = async () => {
    return prisma.category.findMany();
};

export const createCategory = async (name: string) => {
    return prisma.category.create({
        data: { name },
    });
}; 