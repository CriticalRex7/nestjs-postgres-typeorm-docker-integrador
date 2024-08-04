// src/provinces/provinces.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './province.entity';
import { ProvincesSeedService } from './provinces.seed';

@Module({
    imports: [TypeOrmModule.forFeature([Province])], // Importa el repositorio de Province
    providers: [ProvincesSeedService], // Asegúrate de incluir el servicio de seeding
    exports: [ProvincesSeedService], // Exporta el servicio si lo necesitas en otros módulos
})
export class ProvincesModule { }
