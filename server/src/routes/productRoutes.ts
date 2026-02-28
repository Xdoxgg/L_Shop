import {Router} from 'express';
import ProductController from "../controllers/productController";

const router = Router();
const controller = ProductController.getInstance();
router.get('/', controller.getProducts);




export default router;
