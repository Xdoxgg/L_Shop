import {ProductDto} from "./ProductDto";

export class BasketProduct {
    count: number;
    products: ProductDto;
}

export class BasketDto {
    id: number | string;
    userId: number | string;
    basket: BasketProduct[];
}

