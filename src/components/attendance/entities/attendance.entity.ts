import { Company } from "src/components/company/entities/company.entity";
import { Employee } from "src/components/employee/entities/employee.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee, { eager: true })
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;

    @ManyToOne(() => Company, { eager: true })
    @JoinColumn({ name: 'company_id' }) 
    company: Company;

    @Column({ nullable: true }) 
    entryTime: Date;

    @Column({ nullable: true })  
    exitTime: Date;

    @Column()
    status: boolean;
}
