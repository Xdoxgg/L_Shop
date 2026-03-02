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
        const userId = req.query.userId as number;
        
        res.json({'basket': BasketService.getInstance().getUserBasket(userId)})
    }
    
    public addItemToBasket(req: Request, res: Response): void {
        const userId = req.body.userId;
        const itemId = req.body.itemId;
        const count = req.body.count;
        
    }
    
}
