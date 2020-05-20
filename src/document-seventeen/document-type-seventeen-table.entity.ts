import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { fte_document_type_seventeen } from "./document-type-seventeen.entity";

@Entity()
export class fte_document_type_seventeen_table extends BaseEntity {

    @PrimaryGeneratedColumn()
    idtable: number;

    @ManyToOne(type => fte_document_type_seventeen, seventeen => seventeen.tables, { eager: false })
    @JoinColumn({ name: 'idType' })
    type: fte_document_type_seventeen;

    @Column({ type: 'tinyint', width: 5 })
    studentno: number;

    @Column({ type: 'varchar', length: 128 })
    idstudent: string;

    @Column({ type: 'varchar', length: 128 })
    namestudent: string;

    @Column({ type: 'varchar', length: 128 })
    surnamestudent: string;

    @Column({ type: 'varchar', length: 128 })
    namemajor: string;

    @Column({ type: 'varchar', length: 128 })
    groupstudy: string;

    @Column({ type: 'varchar', length: 128 })
    note: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;
}