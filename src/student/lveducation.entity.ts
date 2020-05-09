// import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
// import { fte_student } from "./student.entity";

// @Entity()
// export class fte_lveducation extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id_program: number

//     @OneToMany(type => fte_student, student => student.lveducation, { eager: false })
//     student: fte_student[]

//     @Column({ type: 'varchar', length: 50 })
//     name_program: string

//     @Column({ type: 'tinyint', width: 3 })
//     course_year: number

//     @Column({ type: 'varchar', length: 50 })
//     type_education: string

//     @Column({ type: 'tinyint', width: 3 })
//     year: number

//     @Column({ type: 'varchar', length: 50 })
//     type_degree: string
// }