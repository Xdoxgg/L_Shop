
type Address= {
    country?: string;
    town?: string;
    street?: string;
    houseNumber?: string;
}

export class ProductDto {
    id: number;
    title: string;
    price: number;
    isAvailable: boolean;
    description: string;
    categories: string[];
    images: {
        preview: string;
        gallery?: string[];
    };
    delivery?: {
        startTown: Address;
        earlyDate: Date;
        price: number;
    }
    discount?: number;
} 