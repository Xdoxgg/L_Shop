import { IsNumber, IsString, IsDate, IsEnum, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { BasketProduct } from './BasketDto';
import { AddressDto } from './AddressDto';

export enum DeliveryStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled'
}

export class DeliveryDto {
    @IsNumber()
    id: number;

    @IsNumber()
    userId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BasketProduct)
    basket: BasketProduct[];

    @ValidateNested()
    @Type(() => AddressDto)
    deliveryAddress: AddressDto;

    @IsDate()
    @Type(() => Date)
    deliveryDate: Date;

    @IsNumber()
    deliveryPrice: number;

    @IsEnum(DeliveryStatus)
    status: DeliveryStatus;

    @IsOptional()
    @IsString()
    trackingNumber?: string;

    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    @IsDate()
    @Type(() => Date)
    updatedAt: Date;
}