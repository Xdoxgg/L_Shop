import { Request, Response } from 'express';
import BasketService from '../services/BasketService';

class BasketController {
    private static instance: BasketController;

    private constructor() {}

    public static getInstance(): BasketController {
        if (!BasketController.instance) {
            BasketController.instance = new BasketController();
        }
        return BasketController.instance;
    }

    public getUserBasket(req: Request, res: Response): void {
        const userId = Number(req.query.userId);
        if (isNaN(userId)) {
            res.status(400).json({ error: 'Некорректный userId' });
            return;
        }
        const basket = BasketService.getInstance().getUserBasket(userId);
        res.json(basket);
    }

    public addItemToBasket(req: Request, res: Response): void {
        const userId = Number(req.body.userId);
        const itemId = Number(req.body.itemId);
        const count = Number(req.body.count);

        if (isNaN(userId) || isNaN(itemId) || isNaN(count) || count <= 0) {
            res.status(400).json({ error: 'Некорректные данные' });
            return;
        }

        const result = BasketService.getInstance().addItemToBasket(userId, itemId, count);
        res.json({ result });
    }

    public removeItemFromBasket(req: Request, res: Response): void {
        const userId = Number(req.body.userId);
        const itemId = Number(req.body.itemId);

        if (isNaN(userId) || isNaN(itemId)) {
            res.status(400).json({ error: 'Некорректные userId или itemId' });
            return;
        }

        const result = BasketService.getInstance().removeItemFromBasket(userId, itemId);
        res.json({ result });
    }

    public updateItemCount(req: Request, res: Response): void {
        const userId = Number(req.body.userId);
        const itemId = Number(req.body.itemId);
        const count = Number(req.body.count);

        if (isNaN(userId) || isNaN(itemId) || isNaN(count) || count < 0) {
            res.status(400).json({ error: 'Некорректные данные' });
            return;
        }

        const result = BasketService.getInstance().updateItemCount(userId, itemId, count);
        res.json({ result });
    }

    public clearBasket(req: Request, res: Response): void {
        const userId = Number(req.body.userId);
        if (isNaN(userId)) {
            res.status(400).json({ error: 'Некорректный userId' });
            return;
        }

        const result = BasketService.getInstance().clearBasket(userId);
        res.json({ result });
    }
}

export default BasketController;