import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { fte_document } from "../document/document.entity";
import { fte_signature_one } from "./signature-one.entity";

@Entity()
export class fte_document_type_one extends BaseEntity {
    @PrimaryGeneratedColumn()
    idtype: number;

    @OneToOne(type => fte_document, document => document.type_one, { eager: false })
    // @JoinColumn({name:'id_document'})
    document: fte_document;

    @OneToOne(type => fte_signature_one, { eager: true })
    @JoinColumn({ name: 'id_signature' })
    signature: fte_signature_one;

    @Column({ type: "varchar", length: 128 })
    topic: string;

    @Column({ type: "varchar", length: 128 })
    dear: string;

    @Column({ type: "varchar", length: 128 })
    purpose: string;

    @Column({ type: "varchar", length: 512 })
    since: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;
}