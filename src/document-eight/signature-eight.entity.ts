import { Entity, BaseEntity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { fte_authority } from "src/authority/authority.entity";
import { fte_document_type_eight } from "./document-type-eight.entity";
import { SignatureStatus } from "src/document/enum/signature-status.enum";


@Entity()
export class fte_signature_eight extends BaseEntity {

    @PrimaryGeneratedColumn()
    idsig: number;

    @OneToOne(type => fte_document_type_eight, eight => eight.signature, { eager: false })
    type: fte_document_type_eight;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: 'advisor_id' })
    advisor_id: fte_authority;

    //ความคิดเห็น
    @Column({ type: 'varchar', length: 255, nullable: true })
    advisor_comment: string;

    //path ของ sig
    @Column({ type: 'varchar', length: 255, nullable: true })
    advisor_path_sig: string;

    //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
    @Column({ type: 'tinyint' })
    advisor_status_sig: SignatureStatus;

    //ลำดับที่
    @Column({ type: 'int', nullable: true, default: 1 })
    advisor_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    advisor_time: Date;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: 'mastersubject_id' })
    mastersubject_id: fte_authority;
    //ความคิดเห็น
    @Column({ type: 'varchar', length: 255, nullable: true })
    mastersubject_comment: string;

    //path ของ sig
    @Column({ type: 'varchar', length: 255, nullable: true })
    mastersubject_path_sig: string;

    //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
    @Column({ type: 'tinyint' })
    mastersubject_status_sig: SignatureStatus;

    //ลำดับที่
    @Column({ type: 'int', nullable: true, default: 2 })
    mastersubject_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    mastersubject_time: Date;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: 'head_service_or_deanoffice_id' })
    head_service_or_deanoffice_id: fte_authority;
    //ความคิดเห็น
    @Column({ type: 'varchar', length: 255, nullable: true })
    head_service_or_deanoffice_comment: string;

    //path ของ sig
    @Column({ type: 'varchar', length: 255, nullable: true })
    head_service_or_deanoffice_path_sig: string;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    head_service_or_deanoffice_termleavedate: Date;

    //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
    @Column({ type: 'tinyint' })
    head_service_or_deanoffice_status_sig: SignatureStatus;

    //ลำดับที่
    @Column({ type: 'int', nullable: true, default: 3 })
    head_service_or_deanoffice_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    head_service_or_deanoffice_time: Date;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: 'deputy_dean_research_id' })
    deputy_dean_research_id: fte_authority;
    //ความคิดเห็น
    //อนุมัติ
    @Column({ type: 'tinyint', width: 3, nullable: true })
    deputy_dean_research_approve: number;
    //ไม่อนุมัติ
    @Column({ type: 'tinyint', width: 3, nullable: true })
    deputy_dean_research_unapprove: number;

    //path ของ sig
    @Column({ type: 'varchar', length: 255, nullable: true })
    deputy_dean_research_path_sig: string;

    //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
    @Column({ type: 'tinyint' })
    deputy_dean_research_status_sig: SignatureStatus;

    //ลำดับที่
    @Column({ type: 'int', nullable: true, default: 4 })
    deputy_dean_research_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    deputy_dean_research_time: Date;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: 'dean_id' })
    dean_id: fte_authority;
    //อนุมัติ
    @Column({ type: 'tinyint', width: 3, nullable: true })
    dean_approve: number;

    //ไม่อนุมัติ
    @Column({ type: 'tinyint', width: 3, nullable: true })
    dean_unapprove: number;

    //path ของ sig
    @Column({ type: 'varchar', length: 255, nullable: true })
    dean_path_sig: string;

    //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
    @Column({ type: 'tinyint' })
    daen_status_sig: SignatureStatus;

    //ลำดับที่
    @Column({ type: 'int', nullable: true, default: 5 })
    dean_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    dean_time: Date;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;

}