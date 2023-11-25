import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    role: string

    @Column({ nullable: true })
    resetToken: string;

    @Column({ type: 'timestamp', nullable: true }) 
    resetTokenExpires: Date;
}
