"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getAllCategories = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllCategories = async () => {
    return prisma.category.findMany();
};
exports.getAllCategories = getAllCategories;
const createCategory = async (name) => {
    return prisma.category.create({
        data: { name },
    });
};
exports.createCategory = createCategory;
