import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { fte_document_type_eight } from "./document-type-eight.entity";
import { fte_authority } from "src/authority/authority.entity";

@Entity()
export class fte_document_type_eight_table extends BaseEntity {

    @PrimaryGeneratedColumn()
    idtable: number;

    @ManyToOne(type => fte_document_type_eight, eight => eight.tables, { eager: false })
    @JoinColumn({ name: 'idType' })
    type: fte_document_type_eight;

    @ManyToOne(type => fte_authority, { eager: true })
    @JoinColumn({ name: 'advisor_id' })
    advisor: fte_authority;

    @Column({ type: 'tinyint', width: 15 })
    idsubject: number;

    @Column({ type: 'varchar', length: 128 })
    namesubject: string;

    @Column({ type: 'varchar', length: 128 })
    oldgroubstudy: string;

    @Column({ type: 'varchar', length: 255 })
    path_oldsignature: string;

    @Column({ type: 'varchar', length: 128 })
    newgroupstudy: string;

    @Column({ type: 'varchar', length: 255 })
    path_newsignature: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;
}