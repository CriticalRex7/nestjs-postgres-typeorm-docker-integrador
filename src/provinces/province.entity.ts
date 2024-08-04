import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('provinces')
export class Province {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;
}