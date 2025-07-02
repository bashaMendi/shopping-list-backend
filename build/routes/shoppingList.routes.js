"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controller functions are now imported
const shoppingList_controller_1 = require("../controllers/shoppingList.controller");
const router = (0, express_1.Router)();
router.get('/', shoppingList_controller_1.getAllShoppingLists);
router.post('/', shoppingList_controller_1.createShoppingList);
router.get('/:id', shoppingList_controller_1.getShoppingListById);
router.put('/:id', shoppingList_controller_1.updateShoppingList);
router.delete('/:id', shoppingList_controller_1.deleteShoppingList);
exports.default = router;
