"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShoppingList = exports.updateShoppingList = exports.getShoppingListById = exports.createShoppingList = exports.getAllShoppingLists = void 0;
// Service functions will be imported here later
const ShoppingListService = __importStar(require("../services/shoppingList.service"));
const getAllShoppingLists = async (req, res) => {
    try {
        const lists = await ShoppingListService.getAllShoppingLists();
        res.json(lists);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch shopping lists', error });
    }
};
exports.getAllShoppingLists = getAllShoppingLists;
const createShoppingList = async (req, res) => {
    try {
        const newList = await ShoppingListService.createShoppingList(req.body);
        res.status(201).json(newList);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create shopping list', error });
    }
};
exports.createShoppingList = createShoppingList;
const getShoppingListById = async (req, res) => {
    try {
        const { id } = req.params;
        const list = await ShoppingListService.getShoppingListById(id);
        if (!list) {
            res.status(404).json({ message: 'Shopping list not found' });
            return;
        }
        res.json(list);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch shopping list', error });
    }
};
exports.getShoppingListById = getShoppingListById;
const updateShoppingList = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedList = await ShoppingListService.updateShoppingList(id, req.body);
        res.json(updatedList);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to update shopping list', error });
    }
};
exports.updateShoppingList = updateShoppingList;
const deleteShoppingList = async (req, res) => {
    try {
        const { id } = req.params;
        await ShoppingListService.deleteShoppingList(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete shopping list', error });
    }
};
exports.deleteShoppingList = deleteShoppingList;
