import {ProductDto} from "./ProductDto";

interface BasketProduct {
    count: number;
    products: ProductDto;
}

export interface BasketDto {
    id: number | string;
    userId: number | string;
    basket: BasketProduct[];
}

