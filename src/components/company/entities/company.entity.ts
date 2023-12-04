import { User } from "src/components/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    location: string;

    @Column() // Add this line for the role property
    role: string;

    @ManyToOne(() => User, { eager: true }) 
    @JoinColumn({ name: 'userId' })
    user: User;
}
