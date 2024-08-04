import { Empleo } from 'src/empleos/entities/empleo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    ruc: string;

    @Column()
    address: string;

    @Column()
    province: string;

    @OneToMany(() => Empleo, empleo => empleo.company)
    empleos: Empleo[];
}
