import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define a type for the structure of a new shopping list
type NewShoppingListData = {
    name: string;
    items: {
        name: string;
        categoryId?: string;
        categoryName?: string;
        category?: string;
        quantity: number;
    }[];
};

// Define a type for updating shopping list items
type UpdateShoppingListData = {
    name?: string;
    items?: {
        id?: string; // For existing items
        name: string;
        categoryId?: string;
        categoryName?: string;
        category?: string;
        quantity: number;
        isCompleted?: boolean;
    }[];
};

// Helper function to get category name
const getCategoryName = (item: any): string => {
    if (item.category) return item.category;
    if (item.categoryName) return item.categoryName;
    return 'אחר'; // default fallback
};

export const getAllShoppingLists = async () => {
    // This will fetch all shopping lists with their items
    const lists = await prisma.shoppingList.findMany({
        include: {
            items: {
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    });
    return lists;
};

export const createShoppingList = async (data: NewShoppingListData) => {
    const newList = await prisma.shoppingList.create({
        data: {
            name: data.name,
            items: {
                create: data.items.map(item => ({
                    name: item.name,
                    category: getCategoryName(item),
                    quantity: item.quantity,
                    isCompleted: false
                }))
            }
        },
        include: {
            items: true
        }
    });
    return newList;
};

export const getShoppingListById = async (id: string) => {
    const list = await prisma.shoppingList.findUnique({
        where: { id },
        include: {
            items: {
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    });
    return list;
};

export const updateShoppingList = async (id: string, data: UpdateShoppingListData) => {
    // Start a transaction to handle the update
    return await prisma.$transaction(async (tx) => {
        // If items are provided, we need to handle the update carefully
        if (data.items && data.items.length > 0) {
            // First, delete all existing items
            await tx.shoppingListItem.deleteMany({
                where: { shoppingListId: id }
            });

            // Then create new items
            const updatedList = await tx.shoppingList.update({
                where: { id },
                data: {
                    name: data.name,
                    items: {
                        create: data.items.map(item => ({
                            name: item.name,
                            category: getCategoryName(item),
                            quantity: item.quantity,
                            isCompleted: item.isCompleted || false
                        }))
                    }
                },
                include: {
                    items: true
                }
            });
            return updatedList;
        } else {
            // Just update the name
            const updatedList = await tx.shoppingList.update({
                where: { id },
                data: {
                    name: data.name
                },
                include: {
                    items: {
                        orderBy: {
                            createdAt: 'asc'
                        }
                    }
                }
            });
            return updatedList;
        }
    });
};

export const deleteShoppingList = async (id: string) => {
    // Items will be deleted automatically due to cascade
    await prisma.shoppingList.delete({
        where: { id }
    });
};

// New functions for individual item management
export const addItemToShoppingList = async (shoppingListId: string, itemData: {
    name: string;
    categoryId?: string;
    categoryName?: string;
    category?: string;
    quantity: number;
}) => {
    const newItem = await prisma.shoppingListItem.create({
        data: {
            name: itemData.name,
            category: getCategoryName(itemData),
            quantity: itemData.quantity,
            shoppingListId,
            isCompleted: false
        }
    });
    return newItem;
};

export const updateShoppingListItem = async (itemId: string, itemData: {
    name?: string;
    categoryId?: string;
    categoryName?: string;
    category?: string;
    quantity?: number;
    isCompleted?: boolean;
}) => {
    const updateData: any = { ...itemData };
    
    // Handle category conversion
    if (itemData.categoryId || itemData.categoryName || itemData.category) {
        updateData.category = getCategoryName(itemData);
        delete updateData.categoryId;
        delete updateData.categoryName;
    }
    
    const updatedItem = await prisma.shoppingListItem.update({
        where: { id: itemId },
        data: updateData
    });
    return updatedItem;
};

export const deleteShoppingListItem = async (itemId: string) => {
    await prisma.shoppingListItem.delete({
        where: { id: itemId }
    });
};

export const toggleItemCompletion = async (itemId: string) => {
    const item = await prisma.shoppingListItem.findUnique({
        where: { id: itemId }
    });
    
    if (!item) {
        throw new Error('Item not found');
    }

    const updatedItem = await prisma.shoppingListItem.update({
        where: { id: itemId },
        data: {
            isCompleted: !item.isCompleted
        }
    });
    return updatedItem;
}; 