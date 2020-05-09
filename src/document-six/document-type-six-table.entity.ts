import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { fte_document_type_six } from "./document-type-six.entity";
import { fte_authority } from "src/authority/authority.entity";

@Entity()
export class fte_document_type_six_table extends BaseEntity {
    @PrimaryGeneratedColumn()
    idtable: number;

    @ManyToOne(type => fte_document_type_six, six => six.tables, { eager: false })
    @JoinColumn({ name: 'idType' })
    type: fte_document_type_six;

    @ManyToOne(type => fte_authority, { eager: true })
    @JoinColumn({ name: 'advisor_id' })
    advisor: fte_authority;

    @Column({ type: 'tinyint', width: 3 })
    subjectno: number;

    @Column({ type: 'varchar', length: 128 })
    namesubject: string;

    @Column({ type: 'varchar', length: 128 })
    groupstudy: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    path_signature: string;

    @Column({ type: 'varchar', length: 255 })
    note: string;

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date

}