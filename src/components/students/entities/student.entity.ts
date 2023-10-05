import { Dropdown } from 'src/components/dropdown/entities/dropdown.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  mail: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @Column()
  image: string;

  @ManyToOne(() => Dropdown, { eager: true }) 
  @JoinColumn({ name: 'class' })
  class: Dropdown;

  @ManyToOne(() => Dropdown, { eager: true }) 
  @JoinColumn({ name: 'faculty' })
  faculty: Dropdown;
}
