import { Router } from 'express';
import BasketController from '../controllers/basketController';

const router = Router();
const controller = BasketController.getInstance();

router.get('/', controller.getUserBasket);                
router.post('/add', controller.addItemToBasket);         
router.post('/remove', controller.removeItemFromBasket); 
router.post('/update', controller.updateItemCount);      
router.post('/clear', controller.clearBasket);           

export default router;