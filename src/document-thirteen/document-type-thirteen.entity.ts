import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { fte_document } from "../document/document.entity";
import { fte_signature_thirteen } from "./signature-thirteen.entity";

@Entity()
export class fte_document_type_thirteen extends BaseEntity {

    @PrimaryGeneratedColumn()
    idtype: number;

    @OneToOne(type => fte_document, document => document.type_thirteen, { eager: false })
    document: fte_document;

    @OneToOne(type => fte_signature_thirteen, { eager: true })
    @JoinColumn({ name: 'id_signature' })
    signature: fte_signature_thirteen;



    @Column({ type: 'tinyint', width: 3 })
    certificatesuccess: number;

    @Column({ type: 'tinyint', width: 3 })
    certificateregister: number;

    @Column({ type: 'tinyint', width: 3 })
    transcriptlvone: number;

    @Column({ type: 'tinyint', width: 3 })
    transcriptlvtwo: number;


    @Column({ type: 'tinyint', width: 3 })
    diplomalvone: number;

    @Column({ type: 'tinyint', width: 3 })
    diplomalvpwch: number;

    @Column({ type: 'tinyint', width: 3 })
    diplomalvpwc: number;

    @Column({ type: 'tinyint', width: 3 })
    diplomaptee: number;

    @Column({ type: 'tinyint', width: 3 })
    diplomaptro: number;

    @Column({ type: 'tinyint', width: 3 })
    loststudentcard: number;

    @Column({ type: 'tinyint', width: 3 })
    damagedstudentcard: number;

    @Column({ type: 'tinyint', width: 3 })
    samestudentcard: number;

    @Column({ type: 'tinyint', width: 3 })
    certificateunit: number;

    @Column({ type: 'tinyint', width: 3 })
    otherstatus: number;

    @Column({ type: 'varchar', length: 128 })
    othermassege: string;

    @Column({ type: 'tinyint', width: 3 })
    thaiversioncs: number;

    @Column({ type: 'tinyint', width: 3 })
    amountthcs: number;

    @Column({ type: 'tinyint', width: 3 })
    amountengcs: number;

    @Column({ type: 'tinyint', width: 3 })
    engversioncs: number;

    @Column({ type: 'tinyint', width: 3 })
    thaiversioncr: number;

    @Column({ type: 'tinyint', width: 3 })
    amountthcr: number;

    @Column({ type: 'tinyint', width: 3 })
    thaiversiontclvone: number;

    @Column({ type: 'tinyint', width: 3 })
    amountthtclvone: number;

    @Column({ type: 'tinyint', width: 3 })
    amountengtclvone: number;

    @Column({ type: 'tinyint', width: 3 })
    engversiontclvone: number;

    @Column({ type: 'tinyint', width: 3 })
    thaiversiontclvtwo: number;

    @Column({ type: 'tinyint', width: 3 })
    amountthtclvtwo: number;

    @Column({ type: 'tinyint', width: 3 })
    amountengtclvtwo: number;

    @Column({ type: 'tinyint', width: 3 })
    engversiontclvtwo: number;

    @Column({ type: 'tinyint', width: 3 })
    thaiversiondlvone: number;

    @Column({ type: 'tinyint', width: 3 })
    amountthdlvone: number;

    @Column({ type: 'tinyint', width: 3 })
    amountengdlvone: number;

    @Column({ type: 'tinyint', width: 3 })
    engversiondlvone: number;

    @Column({ type: 'tinyint', width: 3 })
    thaiversiondlvtwo: number;

    @Column({ type: 'tinyint', width: 3 })
    amountthdlvtwo: number;

    @Column({ type: 'tinyint', width: 3 })
    amountengdlvtwo: number;

    @Column({ type: 'tinyint', width: 3 })
    engversiondlvtwo: number;

    @Column({ type: 'tinyint', width: 3 })
    thaiversioncu: number;

    @Column({ type: 'tinyint', width: 3 })
    amountthcu: number;

    @Column({ type: 'tinyint', width: 3 })
    thaiversionotms: number;

    @Column({ type: 'tinyint', width: 3 })
    amountthotms: number;


    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}