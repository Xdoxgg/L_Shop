import {Router} from 'express';
import UserController from "../controllers/userController";

const router = Router();
const userController = UserController.getInstance();


router.get('/authoriseUser', userController.authoriseUser);
router.get('/registrationUser', userController.registrationUser);


export default router;
