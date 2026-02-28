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

    public addProduct(data: ProductDto): void {
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
    }


}

export default ProductService;