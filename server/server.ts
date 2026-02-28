
import express from 'express';
import userRoutes from './src/routes/userRoutes';
import * as dotenv from 'dotenv';
import productRoutes from "./src/routes/productRoutes";
dotenv.config({ path: '.env' });

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);


const PORT = process.env.SERVER_PORT || 3000;
 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});