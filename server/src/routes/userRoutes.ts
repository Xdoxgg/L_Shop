import {Router} from 'express';
import userController from '../controllers/userController';
import UserDto from "../DTO/UserDto";
import UserService from "../services/UserService";

const router = Router();
const userService = UserService.getInstance();
router.get('/', (req, res) => {
    res.send('Список пользователей');
    const newUser = new UserDto();
    newUser.name = 'fu';
    newUser.password = 'fp';
    newUser.email = 'ne@gmail.com'
    newUser.phone= '+22222222222'
    console.log(newUser);
    userService.addUser(newUser)
});

router.get('/:id', (req, res) => userController.getUserById(req, res));

export default router;
