import { Request, Response } from 'express';
import UserService from "../services/UserService";
import UserDto from "../DTO/UserDto";

class UserController {
    private static instance: UserController;
    private constructor() {}
    public static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return this.instance;
    }
    authoriseUser(req: Request, res: Response) {
        let user = new UserDto();
        user.name = req.query.name as string;
        user.password = req.query.password as string;
        user.email = req.query.email as string;
        user.phone = req.query.phone as string;
        console.log(user);
        console.log(req.query.name);
        res.json({'result' : UserService.getInstance().checkAccount(user)})
    }
}

export default UserController;
