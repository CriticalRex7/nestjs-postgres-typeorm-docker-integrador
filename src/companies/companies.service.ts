import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      const company = this.companyRepository.create(createCompanyDto);
      return await this.companyRepository.save(company);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create company');
    }
  }

  async findAll(): Promise<Company[]> {
    try {
      return await this.companyRepository.find({ relations: ['empleos'] });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve companies');
    }
  }

  async findOne(id: number): Promise<Company> {
    try {
      const company = await this.companyRepository.findOne({ where: { id }, relations: ['empleos'] });
      if (!company) {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }
      return company;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve company');
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    try {
      const company = await this.companyRepository.findOneBy({ id });
      if (!company) {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }
      await this.companyRepository.update(id, updateCompanyDto);
      return await this.companyRepository.findOneBy({ id });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update company');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const company = await this.companyRepository.findOneBy({ id });
      if (!company) {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }
      await this.companyRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove company');
    }
  }
}
