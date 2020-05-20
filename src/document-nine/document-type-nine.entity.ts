import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { fte_document } from "../document/document.entity";
import { fte_signature_nine } from "./signature-nine.entity";

@Entity()
export class fte_document_type_nine extends BaseEntity {
    @PrimaryGeneratedColumn()
    idtype: number;

    @OneToOne(type => fte_document, document => document.type_nine, { eager: false })
    document: fte_document;

    @OneToOne(type => fte_signature_nine, { eager: true })
    @JoinColumn({ name: 'id_signature' })
    signature: fte_signature_nine;

    @Column({ type: 'tinyint', width: 5 })
    latepayregiste: number;

    @Column({ type: 'tinyint', width: 5 })
    latepayaddsubject: number;

    @Column({ type: 'tinyint', width: 5 })
    latepaywithdraw: number;

    @Column({ type: 'tinyint', width: 5 })
    latepaymentterm: number;

    @Column({ type: 'tinyint', width: 5 })
    latepaymentyear: number;

    @Column({ type: 'varchar', length: 512 })
    latepaymentsince: string;

    @Column({ type: 'tinyint', width: 5 })
    certificateterm: number;

    @Column({ type: 'tinyint', width: 5 })
    certificateyear: number;

    @Column({ type: 'tinyint', width: 15 })
    idsubject: number;

    @Column({ type: 'varchar', length: 128 })
    namesubject: string;

    @Column({ type: 'varchar', length: 128 })
    groupstudy: string;

    @Column({ type: 'varchar', length: 128 })
    nameauthority: string;

    @Column({ type: 'varchar', length: 255 })
    signatureteacher: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;

}