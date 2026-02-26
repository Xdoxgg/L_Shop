
import express from 'express';
import userRoutes from './src/routes/userRoutes';

const app = express();

app.use(express.json()); // для парсинга JSON в теле запроса

// Подключаем маршруты
app.use('/users', userRoutes);


const PORT =  3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});