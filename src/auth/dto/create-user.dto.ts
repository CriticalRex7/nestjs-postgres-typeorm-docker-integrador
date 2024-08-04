import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    name: string;
    
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(10)
    password: string;

}