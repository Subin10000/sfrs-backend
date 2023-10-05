import { Dropdown } from "src/components/dropdown/entities/dropdown.entity";
import { User } from "src/components/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Dropdown, { eager: true }) 
    @JoinColumn({ name: 'class' })
    class: Dropdown;

    @ManyToOne(() => Dropdown, { eager: true }) 
    @JoinColumn({ name: 'faculty' })
    faculty: Dropdown;

    @ManyToOne(() => User, { eager: true }) 
    @JoinColumn({ name: 'userId' })
    user: User;
}
