import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [
    TypeOrmModule.forFeature([Company])
  ]
})
export class CompaniesModule { }
