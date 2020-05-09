import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { fte_document } from "../document/document.entity";
import { fte_signature_fifteen } from "./signature-fifteen.entity";

@Entity()
export class fte_document_type_fifteen extends BaseEntity {

    @PrimaryGeneratedColumn()
    idtype: number;

    @OneToOne(type => fte_document, document => document.type_fifteen, { eager: false })
    document: fte_document;

    @OneToOne(type => fte_signature_fifteen, { eager: true })
    @JoinColumn({ name: 'id_signature' })
    signature: fte_signature_fifteen;

    @Column({ type: 'tinyint', width: 3 })
    graduationrequestterm: number;

    @Column({ type: 'tinyint', width: 3 })
    graduationrequestyear: number;

    @Column({ type: 'varchar', length: 128 })
    classyear: string;

    @Column({ type: 'varchar', length: 128 })
    timestudy: string;

    @Column({ type: 'tinyint', width: 3 })
    typestudy: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;
}