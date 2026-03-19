import 'reflect-metadata';
import express from 'express';
import userRoutes from './src/routes/userRoutes';
import productRoutes from './src/routes/productRoutes';
import basketRoutes from './src/routes/basketRoutes';
import deliveryRoutes from './src/routes/deliveryRoutes';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const app = express();

app.use(cors());

app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/basket', basketRoutes);
app.use('/delivery', deliveryRoutes);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});