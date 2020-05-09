import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BaseExceptionFilter } from "@nestjs/core";
import { fte_authority } from "./authority.entity";
import { type } from "os";
import { fte_student } from "src/student/student.entity";
import { MajorRepository } from "./major.repository";


@Entity()
export class fte_major extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_major: number;

    @OneToMany(type => fte_authority, authority => authority.major, { eager: false })
    authority: fte_authority;

    @OneToMany(type => fte_student, student => student.major, { eager: false })
    student: fte_student;

    @Column({ type: 'varchar', length: 100 })
    name_major: string

    @Column({ type: 'varchar', length: 100 })
    faculty: string


}


