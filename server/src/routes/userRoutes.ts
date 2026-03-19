import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const controller = UserController.getInstance();

router.post('/register', controller.register.bind(controller));
router.post('/login', controller.login.bind(controller));

router.get('/', controller.getAllUsers.bind(controller));

export default router;