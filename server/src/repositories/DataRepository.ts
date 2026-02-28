import * as fs from 'fs';
import * as path from 'path';
import {BasketDto} from '../DTO/BasketDto';
import {ProductDto} from '../DTO/ProductDto';
import UserDto from '../DTO/UserDto';


type DTOType = BasketDto | ProductDto | UserDto;

export class DataRepository<T extends DTOType> {
    private baseDir: string = path.resolve(__dirname, '../../database/');


    constructor() {
    }

    private getFilePath(filename: string): string {
        if (!filename.endsWith('.json')) {
            filename += '.json';
        }
        return path.resolve(this.baseDir, filename);
    }

    readArray(filename: string): T[] {
        const filePath = this.getFilePath(filename);
        if (!fs.existsSync(filePath)) {
            return [];
        }
        const content = fs.readFileSync(filePath, 'utf-8');
        try {
            const data = JSON.parse(content);
            if (Array.isArray(data)) {
                return data as T[];
            } else {
                throw new Error(`Файл ${filename} не содержит массив`);
            }
        } catch (e) {
            throw new Error(`Ошибка парсинга JSON в файле ${filename}: ${e.message}`);
        }
    }

    writeArray(filename: string, data: T[]): void {
        const filePath = this.getFilePath(filename);
        const jsonString = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonString, 'utf-8');
    }

}
