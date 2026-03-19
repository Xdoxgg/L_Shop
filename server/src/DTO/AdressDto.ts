import { IsString } from 'class-validator';

export class AddressDto {
    @IsString()
    address: string;
}