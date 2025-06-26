import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define a type for the structure of a new shopping list
type NewShoppingListData = {
    name: string;
    items: {
        name: string;
        category: string;
        quantity: number;
    }[];
};

export const getAllShoppingLists = async () => {
    // This will fetch all shopping lists from the database
    const lists = await prisma.shoppingList.findMany();
    return lists;
};

export const createShoppingList = async (data: NewShoppingListData) => {
    const newList = await prisma.shoppingList.create({
        data: {
            name: data.name,
            items: data.items,
        },
    });
    return newList;
};

export const getShoppingListById = async (id: string) => {
    const list = await prisma.shoppingList.findUnique({
        where: { id },
    });
    return list;
};

export const updateShoppingList = async (id: string, data: NewShoppingListData) => {
    const updatedList = await prisma.shoppingList.update({
        where: { id },
        data: {
            name: data.name,
            items: data.items,
        },
    });
    return updatedList;
};

export const deleteShoppingList = async (id: string) => {
    await prisma.shoppingList.delete({
        where: { id },
    });
}; 