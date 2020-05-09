import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { fte_authority } from "src/authority/authority.entity";
import { fte_document_type_seventeen } from "./document-type-seventeen.entity";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Entity()
export class fte_signature_seventeen extends BaseEntity {

    @PrimaryGeneratedColumn()
    idsig: number;

    @OneToOne(type => fte_document_type_seventeen, seventeen => seventeen.signature, { eager: false })
    type: fte_document_type_seventeen;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: ' teacherteath_id' })
    teacherteath_id: fte_authority;



    //path ของ sig
    @Column({ type: 'varchar', length: 255, nullable: true })
    teacherteath_path_sig: string;

    //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
    @Column({ type: 'tinyint' })
    teacherteath_status_sig: SignatureStatus;

    //ลำดับที่
    @Column({ type: 'int', nullable: true, default: 1 })
    teacherteath_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    teacherteath_time: Date;


    @ManyToOne(type => fte_authority, { eager: true })
    @JoinColumn({ name: 'head_service_or_deanoffice_id' })
    head_service_or_deanoffice_id: fte_authority;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    head_service_or_deanoffice_termleavedate: Date;

    //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
    @Column({ type: 'tinyint' })
    head_service_or_deanoffice_status_sig: SignatureStatus;

    //ลำดับที่
    @Column({ type: 'int', nullable: true, default: 2 })
    head_service_or_deanoffice_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    head_service_or_deanoffice_time: Date;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;
}
