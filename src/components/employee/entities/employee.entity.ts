import { Company } from 'src/components/company/entities/company.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  location: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'varchar', nullable: true }) 
  image: string;

  @ManyToOne(() => Company, { eager: true })  
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
