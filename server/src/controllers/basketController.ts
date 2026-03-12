import BasketService from "../services/BasketService";
import { Request, Response } from 'express';


class BasketController {
    
    private static instance: BasketController;
    private constructor() {
        
    }
    public static getInstance(): BasketController {
        if (!BasketController.instance) {
            BasketController.instance = new BasketController();
        }
        return BasketController.instance;
    }

    public getUserBasket(req: Request, res: Response): void {
        const userId = Number(req.query.userId);
        if (isNaN(userId)) {
            res.status(400).json({ error: 'как ' + userId + 'будет вилкой чистить'}) ;
        return;}
        res.json({'basket': BasketService.getInstance().getUserBasket(userId)})
    }
    
    public addItemToBasket(req: Request, res: Response): void {
        const userId = req.body.userId;
        const itemId = req.body.itemId;
        const count = req.body.count;
        
        if (isNaN(userId) || isNaN(itemId) || isNaN(count) || count <= 0) {
            res.status(400).json({error: 'wrong data'});
        return
    } res.json ({'result': BasketService.getInstance().addItemToBasket(userId, itemId, count)}); 
    }
    
    public removeItemFromBasket(req: Request, res: Response): void {
        const userId = Number(req.body.userId);
        const itemId = Number(req.body.itemId);

        if (isNaN(userId) || isNaN(itemId)) {
            res.status(400).json({ error: 'wrong id' });
            return;
        }
        const result = BasketService.getInstance().removeItemFromBasket(userId, itemId);
        res.json({ result });
    } 

    public clearBasket(req: Request, res: Response): void {
        const userId = Number(req.body.userId);
        if (isNaN(userId)) {
            res.status(400).json({ error: 'wrong id' });
            return;
        }

        const result = BasketService.getInstance().clearBasket(userId);
        res.json({ result });
    }

}
