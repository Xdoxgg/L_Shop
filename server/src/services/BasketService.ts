import {ProductDto} from "../DTO/ProductDto";
import UserDto from "../DTO/UserDto";
import {DataRepository} from "../repositories/DataRepository";
import {BasketDto, BasketProduct} from "../DTO/BasketDto";
import ProductService from "./ProductService";


class BasketService {
    private static instance: BasketService;
    private dataRepository = new DataRepository<BasketDto>();

    private constructor() {

    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new BasketService();
        }
        return this.instance;
    }

    private getBaskets(): BasketDto[] {
        return this.dataRepository.readArray('basket');
    }
    
    private setBaskets(data: BasketDto[]) {
        this.dataRepository.writeArray('basket', data);
    }
    
    public getUserBasket(userId: number) {
        return this.getBaskets().filter(el => el.userId === userId)[0];
    }

    public addItemToBasket(userId: number, itemId: number, count: number) {
        const item = ProductService.getInstance().getProducts().filter(el => el.id === itemId)[0];
        let baskets = this.getBaskets();
        let userBasket = baskets.find(basket => basket.userId === userId);

        if (!userBasket) {
            userBasket = new BasketDto();
            userBasket.id = userId;
            baskets.push(userBasket);
        }

        const existingItemIndex = userBasket.basket.findIndex(i => i.products.id === itemId);

        if (existingItemIndex !== -1) {
            userBasket.basket[existingItemIndex].count += count;
        } else {
            let productBasket = new BasketProduct();
            productBasket.count = count;
            productBasket.products = item;
            userBasket.basket.push(productBasket);
        }
        
        this.setBaskets(baskets );



    }

}

export default BasketService;