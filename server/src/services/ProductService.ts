import {DataRepository} from "../repositories/DataRepository";
import {ProductDto} from "../DTO/ProductDto";


class ProductService {
    private static instance: ProductService;
    private dataRepository: DataRepository<ProductDto>;

    private constructor() {
        this.dataRepository = new DataRepository<ProductDto>();
    }

    public static getInstance(): ProductService {
        if (this.instance == null) {
            this.instance = new ProductService();
        }
        return this.instance;
    }

    public getProducts(): ProductDto[] {
        return this.dataRepository.readArray('products');
    }

    private setProducts(data: ProductDto[]): void {
        this.dataRepository.writeArray('products', data);
    }

    public addProduct(data: ProductDto): string {
        let arr =this.getProducts();
        let dataId: number;
        if (arr.length == 0) {
            arr = []
            dataId = 1;
        } else {
            dataId = arr[arr.length - 1].id + 1;
        }
        //TODO: add check constraint on data
        data.id = dataId;
        arr.push(data);
        this.setProducts(arr);
        return 'success';
    }

    public getFilteredProducts(filters: {
        minPrice?: number;
        maxPrice?: number;
        isAvailable?: boolean;
        categories?: string[];
    }): ProductDto[] {
        return this.getProducts().filter(p => {
            // Цена от
            if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
            if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
            if (filters.isAvailable !== undefined && p.isAvailable !== filters.isAvailable) return false;
            if (filters.categories && filters.categories.length > 0) {
                if (!p.categories || !p.categories.some(cat => filters.categories!.includes(cat))) return false;
            }
            return true;
        });
    }

    public searchProducts(query: string): ProductDto[] {
        if (!query.trim()) return [];
        const lowerQuery = query.toLowerCase();
        return this.getProducts().filter(p => p.title.toLowerCase().includes(lowerQuery));
    }

    public getProductById(id: number): ProductDto | undefined {
        return this.getProducts().find(p => p.id === id);
    }

    public delProduct(id: number): ProductDto | null {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    const deleted = products.splice(index, 1)[0];
    this.setProducts(products);
    return deleted;
}
}

export default ProductService;