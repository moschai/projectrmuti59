import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { fte_document } from "../document/document.entity";
import { fte_signature_three } from "./signature-three.entity";

@Entity()
export class fte_document_type_three extends BaseEntity {
    @PrimaryGeneratedColumn()
    idtype: number;

    @OneToOne(type => fte_document, document => document.type_three, { eager: false })
    document: fte_document;


    @OneToOne(type => fte_signature_three, { eager: true })
    @JoinColumn({ name: 'id_signature' })
    signature: fte_signature_three;


    @Column({ type: 'tinyint', width: 3 })
    leaveterm: number;

    @Column({ type: 'tinyint', width: 4 })
    leaveyear: number;

    @Column({ type: 'tinyint', width: 3 })
    returnterm: number;

    @Column({ type: 'tinyint', width: 4 })
    returnyear: number;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;



}