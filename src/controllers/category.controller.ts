import { Request, Response } from 'express';
import * as CategoryService from '../services/category.service';

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories', error });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const newCategory = await CategoryService.createCategory(req.body.name);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create category', error });
    }
}; 