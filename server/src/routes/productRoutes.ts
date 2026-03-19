import { Router } from 'express';
import ProductController from '../controllers/productController';

const router = Router();
const controller = ProductController.getInstance();

router.get('/', controller.getProducts);          
router.post('/addProduct', controller.addProduct);
router.get('/search', controller.searchProducts); 
router.delete('/:id', controller.delProduct);

export default router;