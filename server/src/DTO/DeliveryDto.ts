import { IsNumber, IsString, IsDate, IsEnum, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { BasketProduct } from './BasketDto';
import { AddressDto } from './AdressDto';

export enum DeliveryStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled'
}

export class DeliveryDto {
    id: number;
    userId: number;
    basket: BasketProduct[];
    deliveryAddress: AddressDto;
    deliveryDate: Date;
    deliveryPrice: number;
    status: DeliveryStatus;
    trackingNumber?: string;
    createdAt: Date;
    updatedAt: Date;
}