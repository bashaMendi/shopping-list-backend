import { Router } from 'express';

// Controller functions are now imported
import {
  getAllShoppingLists,
  createShoppingList,
  getShoppingListById,
  updateShoppingList,
  deleteShoppingList,
} from '../controllers/shoppingList.controller';

const router = Router();

router.get('/', getAllShoppingLists);
router.post('/', createShoppingList);
router.get('/:id', getShoppingListById);
router.put('/:id', updateShoppingList);
router.delete('/:id', deleteShoppingList);

export default router; 