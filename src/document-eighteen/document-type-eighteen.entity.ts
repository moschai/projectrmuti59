import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";


@Entity()
export class fte_document_type_eighteen extends BaseEntity {

    @PrimaryGeneratedColumn()
    idtype: number;

    @Column({ type: 'tinyint', width: 3 })
    changescoreterm: number;

    @Column({ type: 'tinyint', width: 3 })
    changescoreyear: number;

    @Column({ type: 'tinyint', width: 3 })
    idsubject: number;

    @Column({ type: 'varchar', length: 128 })
    namesubject: string;

    @Column({ type: 'varchar', length: 512 })
    changescoresince: string;

    @Column({ type: 'tinyint', width: 3 })
    studentsubmit: number;

    @Column({ type: 'tinyint', width: 3 })
    studentunsubmit: number;

    @Column({ type: 'tinyint', width: 3 })
    totalstudent: number;

    @Column({ type: 'tinyint', width: 3 })
    lveducation: number;

    @Column({ type: 'tinyint', width: 3 })
    studentno: number;

    @Column({ type: 'tinyint', width: 15 })
    idstudent: number;

    @Column({ type: 'varchar', length: 128 })
    namestudent: string;

    @Column({ type: 'varchar', length: 128 })
    surnamestudent: string;

    @Column({ type: 'varchar', length: 128 })
    groupstudy: string;

    @Column({ type: 'tinyint', width: 3 })
    scorestudent: number;

    @Column({ type: 'varchar', length: 128 })
    gradestudent: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;
}