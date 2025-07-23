import { Router } from 'express';

// Controller functions are now imported
import {
  getAllShoppingLists,
  createShoppingList,
  getShoppingListById,
  updateShoppingList,
  deleteShoppingList,
  addItemToShoppingList,
  updateShoppingListItem,
  deleteShoppingListItem,
  toggleItemCompletion,
} from '../controllers/shoppingList.controller';

const router = Router();

// Shopping list routes
router.get('/', getAllShoppingLists);
router.post('/', createShoppingList);
router.get('/:id', getShoppingListById);
router.put('/:id', updateShoppingList);
router.delete('/:id', deleteShoppingList);

// Individual item routes
router.post('/:id/items', addItemToShoppingList);
router.put('/:id/items/:itemId', updateShoppingListItem);
router.delete('/:id/items/:itemId', deleteShoppingListItem);
router.patch('/:id/items/:itemId/toggle', toggleItemCompletion);

export default router; 