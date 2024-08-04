import { IsString, IsNumber } from 'class-validator';

export class CreateEmpleoDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    location: string;

    @IsNumber()
    salary: number;

    @IsNumber()
    companyId: number;  // Este es el ID de la compañía que publica el empleo
}
