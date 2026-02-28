import { Request, Response } from 'express';
import UserService from "../services/UserService";
import UserDto from "../DTO/UserDto";
import ProductService from "../services/ProductService";

class ProductController {
    private static instance: ProductController;
    private constructor() {}
    public static getInstance(): ProductController {
        if (!ProductController.instance) {
            ProductController.instance = new ProductController();
        }
        return this.instance;
    }
    addProduct(req: Request, res: Response) {
        // let user = new UserDto();
        // user.name = req.query.name as string;
        // user.password = req.query.password as string;
        // user.email = req.query.email as string;
        // user.phone = req.query.phone as string;
        // console.log(user);
        // console.log(req.query.name);
        res.json({'result' : ProductService.getInstance().addProduct(null)})
    }
    getProducts(req: Request, res: Response) {
        res.json(ProductService.getInstance().getProducts());
    }
}

export default ProductController;
