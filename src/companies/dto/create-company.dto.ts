import { IsString, Length, Matches } from 'class-validator';

export class CreateCompanyDto {
     @IsString()
     @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
     readonly name: string;

     @IsString()
     @Length(13, 13, { message: 'RUC must be exactly 13 characters' })
     @Matches(/^\d{10}001$/, { message: 'RUC must be 13 digits and end with 001' })
     readonly ruc: string;

     @IsString()
     @Length(1, 255, { message: 'Address must be between 1 and 255 characters' })
     readonly address: string;

     @IsString()
     @Length(1, 100, { message: 'Province must be between 1 and 100 characters' })
     readonly province: string;
}
