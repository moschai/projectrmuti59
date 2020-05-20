import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { fte_document } from "../document/document.entity";
import { fte_signature_two } from "./signature-two.entity";

@Entity()
export class fte_document_type_two extends BaseEntity {
    @PrimaryGeneratedColumn()
    idtype: number;

    @OneToOne(type => fte_document, document => document.type_two, { eager: false })
    document: fte_document;

    @OneToOne(type => fte_signature_two, { eager: true })
    @JoinColumn({ name: 'id_signature' })
    signature: fte_signature_two;


    @Column({ type: 'tinyint', width: 5 })
    takeleaveterm: number;

    @Column({ type: 'tinyint', width: 5 })
    takeleaveyear: number;

    @Column({ type: "varchar", length: 128 })
    dear: string;

    @Column({ type: 'tinyint', width: 5 })
    returnterm: number;

    @Column({ type: 'tinyint', width: 5 })
    returnyear: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;
}