import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/', (req, res) => {
    res.send('Список пользователей');
});

router.get('/:id', (req, res) => userController.getUserById(req, res));

export default router;
