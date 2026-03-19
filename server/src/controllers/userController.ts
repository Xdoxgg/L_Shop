import { Request, Response } from 'express';
import UserService from "../services/UserService";

class UserController {
    private static instance: UserController;
    private constructor() {}
    public static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    public async register(req: Request, res: Response): Promise<void> {
        const { name, password, email, phone } = req.body;

        if (!name || !password) {
            res.status(400).json({ error: 'Имя и пароль обязательны' });
            return;
        }

        const result = await UserService.getInstance().register({ name, password, email, phone });
        if (result.success) {
            res.status(201).json(result.user);
        } else {
            res.status(400).json({ error: result.message });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { name, password } = req.body;

        if (!name || !password) {
            res.status(400).json({ error: 'Имя и пароль обязательны' });
            return;
        }

        const result = await UserService.getInstance().login(name, password);
        if (result.success) {
            res.json(result.user);
        } else {
            res.status(401).json({ error: result.message });
        }
    }

    public getAllUsers(req: Request, res: Response): void {
        const users = UserService.getInstance().getAllUsers();
        res.json(users);
    }
}

export default UserController;