import { Router } from 'express';
import DeliveryController from '../controllers/DeliveryController';

const router = Router();
const controller = DeliveryController.getInstance();

router.post('/', controller.createDelivery);
router.get('/:id', controller.getDeliveryById);
router.get('/', controller.getUserDeliveries);
router.patch('/:id/status', controller.updateDeliveryStatus);

export default router;