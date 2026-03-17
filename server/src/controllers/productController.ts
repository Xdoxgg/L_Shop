import { Request, Response } from 'express';
import ProductService from "../services/ProductService";
import { ProductDto } from "../DTO/ProductDto";

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
        const { minPrice, maxPrice, isAvailable, categories } = req.query;
        const filters: any = {};
        if (minPrice) filters.minPrice = Number(minPrice);
        if (maxPrice) filters.maxPrice = Number(maxPrice);
        if (isAvailable) filters.isAvailable = isAvailable === 'true';
        if (categories) filters.categories = (categories as string).split(',');

        const products = ProductService.getInstance().getFilteredProducts(filters);
        res.json(products);
    }

    searchProducts(req: Request, res: Response) {
        const query = req.query.q as string;
        if (!query) {
            res.status(400).json({ error: 'Не указан поисковый запрос' });
            return;
        }
        const results = ProductService.getInstance().searchProducts(query);
        res.json(results);
    }

    delProduct(req: Request, res: Response) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Некорректный ID' });
            return;
        }

        const deleted = ProductService.getInstance().delProduct(id);
        if (!deleted) {
            res.status(404).json({ error: 'Продукт не найден' });
            return;
        }
        res.json({ result: deleted });
    }
}

export default ProductController;