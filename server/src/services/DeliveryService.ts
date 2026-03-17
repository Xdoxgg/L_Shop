import { DeliveryDto, DeliveryStatus } from '../DTO/DeliveryDto';
import { DataRepository } from '../repositories/DataRepository';

class DeliveryService {
    private static instance: DeliveryService;
    private dataRepository: DataRepository<DeliveryDto>;

    private constructor() {
        this.dataRepository = new DataRepository<DeliveryDto>();
    }

    public static getInstance(): DeliveryService {
        if (!DeliveryService.instance) {
            DeliveryService.instance = new DeliveryService();
        }
        return DeliveryService.instance;
    }

    private readDeliveries(): DeliveryDto[] {
        return this.dataRepository.readArray('deliveries');
    }

    private writeDeliveries(data: DeliveryDto[]): void {
        this.dataRepository.writeArray('deliveries', data);
    }

    public createDelivery(delivery: DeliveryDto): DeliveryDto {
        const deliveries = this.readDeliveries();
        delivery.id = deliveries.length > 0 ? deliveries[deliveries.length - 1].id + 1 : 1;
        delivery.createdAt = new Date();
        delivery.updatedAt = new Date();
        deliveries.push(delivery);
        this.writeDeliveries(deliveries);
        return delivery;
    }

    public getDeliveryById(id: number): DeliveryDto | undefined {
        return this.readDeliveries().find(d => d.id === id);
    }

    public getUserDeliveries(userId: number): DeliveryDto[] {
        return this.readDeliveries().filter(d => d.userId === userId);
    }

    public updateDeliveryStatus(id: number, status: DeliveryStatus): DeliveryDto | undefined {
        const deliveries = this.readDeliveries();
        const index = deliveries.findIndex(d => d.id === id);
        if (index === -1) return undefined;
        deliveries[index].status = status;
        deliveries[index].updatedAt = new Date();
        this.writeDeliveries(deliveries);
        return deliveries[index];
    }
}

export default DeliveryService;