import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(3, 100, { message: 'Username must be between 3 and 100 characters' })
    readonly username: string;

    @IsEmail({}, { message: 'Invalid email address' })
    readonly email: string;

    @IsString()
    @Length(6, 100, { message: 'Password must be at least 6 characters long' })
    readonly password: string;
}
