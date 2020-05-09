import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { fte_student } from "./student.entity";

@Entity()
export class fte_subject extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 100 })
    id_subject: string

    // @OneToMany(type=>fte_student,student=>student.subject,{eager:false})
    // student:fte_student[]

    @Column({ type: 'varchar', length: 255 })
    name_subject: string

    @Column({ type: 'int' })
    unit_subject: number
}