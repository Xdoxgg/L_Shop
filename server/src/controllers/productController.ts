import {Request, Response} from 'express';
import ProductService from "../services/ProductService";
import {ProductDto} from "../DTO/ProductDto";

class ProductController {
    private static instance: ProductController;

    private constructor() {
    }

    public static getInstance(): ProductController {
        if (!ProductController.instance) {
            ProductController.instance = new ProductController();
        }
        return this.instance;
    }

    addProduct(req: Request, res: Response) {
        let product = new ProductDto();
        product.title = req.body.title;
        product.price = Number(req.body.price);
        product.isAvailable = Boolean(req.body.isAvailable);
        product.description = req.body.description;
        product.categories = req.body.categories;
        product.images = req.body.images;
        product.discount = Number(req.body.discount);
        res.json({'result': ProductService.getInstance().addProduct(product)});
    }

    getProducts(req: Request, res: Response) {
        res.json(ProductService.getInstance().getProducts());
    }
    
}

export default ProductController;
