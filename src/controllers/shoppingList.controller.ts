import { Request, Response } from 'express';

// Service functions will be imported here later
import * as ShoppingListService from '../services/shoppingList.service';

export const getAllShoppingLists = async (req: Request, res: Response) => {
    try {
        const lists = await ShoppingListService.getAllShoppingLists();
        res.json(lists);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch shopping lists', error });
    }
};

export const createShoppingList = async (req: Request, res: Response) => {
    try {
        const newList = await ShoppingListService.createShoppingList(req.body);
        res.status(201).json(newList);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create shopping list', error });
    }
};

export const getShoppingListById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const list = await ShoppingListService.getShoppingListById(id);
        if (!list) {
            res.status(404).json({ message: 'Shopping list not found' });
            return;
        }
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch shopping list', error });
    }
};

export const updateShoppingList = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedList = await ShoppingListService.updateShoppingList(id, req.body);
        res.json(updatedList);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update shopping list', error });
    }
};

export const deleteShoppingList = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await ShoppingListService.deleteShoppingList(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete shopping list', error });
    }
};

// New controller functions for individual item management
export const addItemToShoppingList = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newItem = await ShoppingListService.addItemToShoppingList(id, req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: 'Failed to add item to shopping list', error });
    }
};

export const updateShoppingListItem = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;
        const updatedItem = await ShoppingListService.updateShoppingListItem(itemId, req.body);
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update shopping list item', error });
    }
};

export const deleteShoppingListItem = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;
        await ShoppingListService.deleteShoppingListItem(itemId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete shopping list item', error });
    }
};

export const toggleItemCompletion = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;
        const updatedItem = await ShoppingListService.toggleItemCompletion(itemId);
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: 'Failed to toggle item completion', error });
    }
}; 