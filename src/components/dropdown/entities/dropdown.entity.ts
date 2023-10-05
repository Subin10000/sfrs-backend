import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dropdown {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;
}
