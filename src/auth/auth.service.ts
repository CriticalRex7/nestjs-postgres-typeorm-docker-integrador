import { Injectable, InternalServerErrorException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      user.password = await bcrypt.hash(user.password, 10);
      await this.userRepository.save(user);
      const token = this.getJwtToken({ id: user.id });
      return { ...user, token };
    } catch (error) {
      console.error('Error al crear el usuario:', error);  // Agregamos esta línea para registrar el error
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('El correo electrónico ya está en uso');
      }
      throw new InternalServerErrorException("No se pudo crear el usuario");
    }
  }


  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    try {

      const user = await this.userRepository.findOne({
        where: { email },
        select: { id: true, email: true, password: true, name: true, roles: true }
      });

      if (!user) {
        throw new UnauthorizedException("Correo electrónico no encontrado");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException("Contraseña incorrecta");
      }

      const token = this.getJwtToken({ id: user.id });

      return { ...user, token };

    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException("No se pudo iniciar sesión");
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
