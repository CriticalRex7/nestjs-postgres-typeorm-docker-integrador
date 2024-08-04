import { Injectable } from '@nestjs/common';
import { CreateEmpleoDto } from './dto/create-empleo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleo } from './entities/empleo.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class EmpleosService {

  constructor(
    @InjectRepository(Empleo)
    private readonly empleoRepository: Repository<Empleo>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) { }


  async create(createEmpleoDto: CreateEmpleoDto) {
    const company = await this.companyRepository.findOneBy({ id: createEmpleoDto.companyId });

    if (!company) {
      throw new Error('Company not found');
    }

    const empleo = this.empleoRepository.create(createEmpleoDto);
    empleo.company = company;
    return this.empleoRepository.save(empleo);

  }

  findAll() {
    return this.empleoRepository.find({ relations: ['company'] });
  }

  findOne(id: number) {
    return this.empleoRepository.findOne({ where: { id }, relations: ['company'] });
  }
}
