"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const shoppingList_routes_1 = __importDefault(require("./routes/shoppingList.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)()); // Enable CORS for all origins
app.use(express_1.default.json()); // Middleware to parse JSON bodies
app.get('/', (req, res) => {
    res.send('Welcome to the Shopping List API!');
});
// Use the shopping list routes with an /api prefix
app.use('/api/shopping-lists', shoppingList_routes_1.default);
app.use('/api/categories', category_routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
