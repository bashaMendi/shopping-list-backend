import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import shoppingListRoutes from './routes/shoppingList.routes';
import categoryRoutes from './routes/category.routes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Shopping List API!');
});

// Use the shopping list routes with an /api prefix
app.use('/api/shopping-lists', shoppingListRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app; 