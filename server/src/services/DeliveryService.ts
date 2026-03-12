import { DeliveryDto, DeliveryStatus } from '../DTO/DeliveryDto';

class DeliveryService {
    private static instance: DeliveryService;
    private deliveries: DeliveryDto[] = [];

    private constructor() {}

    public static getInstance(): DeliveryService {
        if (!DeliveryService.instance) {
            DeliveryService.instance = new DeliveryService();
        }
        return DeliveryService.instance;
    }

    public createDelivery(deliveryData: DeliveryDto): DeliveryDto {
        if (!deliveryData.id) {
            deliveryData.id = this.deliveries.length + 1;
        }
        deliveryData.createdAt = deliveryData.createdAt || new Date();
        deliveryData.updatedAt = new Date();
        
        this.deliveries.push(deliveryData);
        return deliveryData;
    }

    public getDeliveryById(id: number): DeliveryDto | undefined {
        return this.deliveries.find(d => d.id === id);
    }

    public getUserDeliveries(userId: number): DeliveryDto[] {
        return this.deliveries.filter(d => d.userId === userId);
    }

    public updateDeliveryStatus(id: number, status: DeliveryStatus): DeliveryDto | undefined {
        const delivery = this.getDeliveryById(id);
        if (delivery) {
            delivery.status = status;
            delivery.updatedAt = new Date();
        }
        return delivery;
    }

    public cancelDelivery(id: number): DeliveryDto | undefined {
        return this.updateDeliveryStatus(id, DeliveryStatus.CANCELLED);
    }

    public getAllDeliveries(): DeliveryDto[] {
        return this.deliveries;
    }
}

export default DeliveryService;