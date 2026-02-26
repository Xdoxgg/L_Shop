import { Request, Response } from 'express';

class UserController {
    getUserById(req: Request, res: Response) {
        const id = req.params.id;
        res.json({ id, name: 'User ' + id });
    }

    createUser(req: Request, res: Response) {
        const userData = req.body;
        res.status(201).json({ message: 'User created', user: userData });
    }
}

export default new UserController();
