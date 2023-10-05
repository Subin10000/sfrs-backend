import { Student } from "src/components/students/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, { eager: true }) 
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @Column()
    entryTime: Date;

    @Column()
    status: boolean;
}
