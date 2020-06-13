import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { BaseExceptionFilter } from "@nestjs/core";
import { fte_authority } from "./authority.entity";
import { type } from "os";
import { fte_student } from "src/student/student.entity";
import { MajorRepository } from "./major.repository";
import { fte_faculty } from "./faculty.entity";


@Entity()
export class fte_major extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_major: number;

    @ManyToOne(type => fte_faculty, faculty => faculty.major,{eager:true})
    @JoinColumn({name:"id_faculty"})
    faculty: fte_faculty;


    @OneToMany(type => fte_authority, authority => authority.major, { eager: false })
    authority: fte_authority[];

    @OneToMany(type => fte_student, student => student.major, { eager: false })
    student: fte_student[];

    @Column({ type: 'varchar', length: 100 })
    name_major: string

    

}


