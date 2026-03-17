import { DataRepository } from '../repositories/DataRepository';
import { BasketDto, BasketProduct } from '../DTO/BasketDto';
import ProductService from "../services/ProductService";

class BasketService {
    private static instance: BasketService;
    private dataRepository: DataRepository<BasketDto>;

    private constructor() {
        this.dataRepository = new DataRepository<BasketDto>();
    }

    public static getInstance(): BasketService {
        if (!BasketService.instance) {
            BasketService.instance = new BasketService();
        }
        return BasketService.instance;
    }

    private readBaskets(): BasketDto[] {
        return this.dataRepository.readArray('baskets');
    }

    private writeBaskets(data: BasketDto[]): void {
        this.dataRepository.writeArray('baskets', data);
    }

    private getUserBasketOrCreate(userId: number): BasketDto {
        const baskets = this.readBaskets();
        let basket = baskets.find(b => b.userId === userId);
        if (!basket) {
            basket = {
                id: baskets.length + 1,
                userId,
                basket: []
            };
            baskets.push(basket);
            this.writeBaskets(baskets);
        }
        return basket;
    }

    public getUserBasket(userId: number): BasketDto {
        return this.getUserBasketOrCreate(userId);
    }

    public addItemToBasket(userId: number, productId: number, count: number): string {
        const baskets = this.readBaskets();
        let basket = baskets.find(b => b.userId === userId);
        if (!basket) {
            basket = { id: baskets.length + 1, userId, basket: [] };
            baskets.push(basket);
        }

        const product = ProductService.getInstance().getProductById(productId);
        if (!product) return 'Товар не найден';

        const existing = basket.basket.find(item => item.products.id === productId);
        if (existing) {
            existing.count += count;
        } else {
            basket.basket.push({ count, products: product });
        }

        this.writeBaskets(baskets);
        return 'success';
    }

    public removeItemFromBasket(userId: number, productId: number): string {
        const baskets = this.readBaskets();
        const basket = baskets.find(b => b.userId === userId);
        if (!basket) return 'Корзина не найдена';

        basket.basket = basket.basket.filter(item => item.products.id !== productId);
        this.writeBaskets(baskets);
        return 'success';
    }

    public updateItemCount(userId: number, productId: number, count: number): string {
        const baskets = this.readBaskets();
        const basket = baskets.find(b => b.userId === userId);
        if (!basket) return 'Корзина не найдена';

        const item = basket.basket.find(i => i.products.id === productId);
        if (!item) return 'Товар не в корзине';

        if (count <= 0) {
            basket.basket = basket.basket.filter(i => i.products.id !== productId);
        } else {
            item.count = count;
        }

        this.writeBaskets(baskets);
        return 'success';
    }

    public clearBasket(userId: number): string {
        const baskets = this.readBaskets();
        const basket = baskets.find(b => b.userId === userId);
        if (!basket) return 'Корзина не найдена';
        basket.basket = [];
        this.writeBaskets(baskets);
        return 'success';
    }
}

export default BasketService;