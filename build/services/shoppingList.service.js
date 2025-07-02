"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShoppingList = exports.updateShoppingList = exports.getShoppingListById = exports.createShoppingList = exports.getAllShoppingLists = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllShoppingLists = async () => {
    // This will fetch all shopping lists from the database
    const lists = await prisma.shoppingList.findMany();
    return lists;
};
exports.getAllShoppingLists = getAllShoppingLists;
const createShoppingList = async (data) => {
    const newList = await prisma.shoppingList.create({
        data: {
            name: data.name,
            items: data.items,
        },
    });
    return newList;
};
exports.createShoppingList = createShoppingList;
const getShoppingListById = async (id) => {
    const list = await prisma.shoppingList.findUnique({
        where: { id },
    });
    return list;
};
exports.getShoppingListById = getShoppingListById;
const updateShoppingList = async (id, data) => {
    const updatedList = await prisma.shoppingList.update({
        where: { id },
        data: {
            name: data.name,
            items: data.items,
        },
    });
    return updatedList;
};
exports.updateShoppingList = updateShoppingList;
const deleteShoppingList = async (id) => {
    await prisma.shoppingList.delete({
        where: { id },
    });
};
exports.deleteShoppingList = deleteShoppingList;
