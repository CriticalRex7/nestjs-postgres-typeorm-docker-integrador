import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column('text', {
        array: true,
        default: ['usuario']
    })

    @Column('text', {
        array: true,
        default: ['usuario']
    })
    roles: string[];
}