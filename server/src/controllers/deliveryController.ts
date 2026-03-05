import deliveryService from '../services/DeliveryService';
import { Request, Response } from 'express';
import { DeliveryDto } from '../DTO/DeliveryDto';

class deliveryController {
    private static instance: deliveryController;

    private constructor() {}

    public static getInstance(): deliveryController {
        if (!deliveryController.instance) {
            deliveryController.instance = new deliveryController();
        }
        return deliveryController.instance;
    }

    public createDelivery(req: Request, res: Response): void {
        let delivery = new DeliveryDto();
        delivery.id = Number(req.body.id);
        delivery.userId = Number(req.body.userId);
        delivery.basket = req.body.basket;
        delivery.deliveryAddress = req.body.deliveryAddress;
        delivery.deliveryDate = new Date(req.body.deliveryDate);
        delivery.deliveryPrice = Number(req.body.deliveryPrice);
        delivery.status = req.body.status;
        delivery.trackingNumber = req.body.trackingNumber;
        delivery.createdAt = new Date();
        delivery.updatedAt = new Date();

        res.json({ 
            'result': deliveryService.getInstance().createDelivery(delivery) 
        });
    }

    public getDeliveryById(req: Request, res: Response): void {
        const deliveryId = Number(req.params.id);
        res.json({ 
            'delivery': deliveryService.getInstance().getDeliveryById(deliveryId) 
        });
    }
    public getUserDeliveries(req: Request, res: Response): void {
        const userId = Number(req.query.userId);
        res.json({ 
            'deliveries': deliveryService.getInstance().getUserDeliveries(userId) 
        });
    }

    public updateDeliveryStatus(req: Request, res: Response): void {
        const deliveryId = Number(req.params.id);
        const status = req.body.status;
        res.json({ 
            'result': deliveryService.getInstance().updateDeliveryStatus(deliveryId, status) 
        });
    }
}

export default deliveryController;