
import express from 'express';
import userRoutes from './src/routes/userRoutes';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const app = express();

app.use(express.json()); 

app.use('/users', userRoutes);


const PORT = process.env.SERVER_PORT || 3000;
 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});