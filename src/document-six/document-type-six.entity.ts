import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { fte_document } from "../document/document.entity";
import { fte_document_type_six_table } from "./document-type-six-table.entity";
import { fte_signature_six } from "./signature-six.entity";

@Entity()
export class fte_document_type_six extends BaseEntity {

    @PrimaryGeneratedColumn()
    idtype: number

    @OneToOne(type => fte_document, document => document.type_six, { eager: false })
    document: fte_document;

    @OneToMany(type => fte_document_type_six_table, table => table.type, { eager: true })
    tables: fte_document_type_six_table[];

    @OneToOne(type => fte_signature_six, { eager: true })
    @JoinColumn({ name: 'id_signature' })
    signature: fte_signature_six;

    @Column({ type: 'tinyint', width: 3 })
    termregister: number;

    @Column({ type: 'tinyint', width: 3 })
    yearregister: number;

    @Column({ type: 'tinyint', width: 3 })
    termtotalunit: number;

    @Column({ type: 'tinyint', width: 3 })
    addregisterunit: number;

    @Column({ type: 'tinyint', width: 3 })
    termsumtotalunit: number;


    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date

}