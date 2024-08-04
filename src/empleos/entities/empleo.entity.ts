import { Company } from 'src/companies/entities/company.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Empleo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    location: string;

    @Column()
    salary: number;

    @ManyToOne(() => Company, company => company.empleos)
    company: Company;
}
