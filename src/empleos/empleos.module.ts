import { Empleo } from './entities/empleo.entity';
import { Module } from '@nestjs/common';
import { EmpleosService } from './empleos.service';
import { EmpleosController } from './empleos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  controllers: [EmpleosController],
  providers: [EmpleosService],
  imports: [
    TypeOrmModule.forFeature([Empleo]),
    CompaniesModule,
  ],
})
export class EmpleosModule { }
