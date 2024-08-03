// src/provinces/provinces.seed.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './province.entity';

@Injectable()
export class ProvincesSeedService {
    constructor(
        @InjectRepository(Province)
        private readonly provinceRepository: Repository<Province>,
    ) { }

    async seedProvinces(): Promise<void> {
        const provinces = [
            'Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Chimborazo',
            'Cotopaxi', 'El Oro', 'Esmeraldas', 'Galápagos', 'Guayas',
            'Imbabura', 'Loja', 'Los Ríos', 'Manabí', 'Morona Santiago',
            'Napo', 'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena',
            'Santo Domingo de los Tsáchilas', 'Sucumbíos', 'Tungurahua',
            'Zamora-Chinchipe',
        ];

        for (const name of provinces) {
            const existingProvince = await this.provinceRepository.findOne({ where: { name } });
            if (!existingProvince) {
                await this.provinceRepository.save({ name });
            }
        }
    }
}
