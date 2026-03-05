import { BasketProduct } from './BasketDto';
import { Address } from './AddressDto';

export enum DeliveryStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export class DeliveryDto {
  id: number | string;
  basket: BasketProduct[];
  userId: number | string;
  deliveryAddress: Address;
  deliveryDate: Date;
  deliveryPrice: number;
  status: DeliveryStatus;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}