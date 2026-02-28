import {Router} from 'express';
import UserDto from "../DTO/UserDto";
import UserService from "../services/UserService";
import UserController from "../controllers/userController";

const router = Router();
const userService = UserService.getInstance();
const userController = UserController.getInstance();
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

router.get('/authoriseUser', userController.authoriseUser);


// router.get('/:id', (req, res) => userController.getUserById(req, res));

export default router;
