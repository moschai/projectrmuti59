import { Entity, BaseEntity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { fte_authority } from "src/authority/authority.entity";
import { fte_document_type_ten } from "./document-type-ten.entity";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Entity()
export class fte_signature_ten extends BaseEntity {

    @PrimaryGeneratedColumn()
    idsig: number;

    @OneToOne(type => fte_document_type_ten, nine => nine.signature, { eager: false })
    type: fte_document_type_ten;





    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: 'boardsubjectone_id' })
    boardsubjectone_id: fte_authority;
    //ลงชื่อ
    @Column({ type: 'varchar', length: 255, nullable: true })
    boardsubjectone_namesurname: string;

    //path ของ sig
    @Column({ type: 'varchar', length: 255, nullable: true })
    aboardsubjectone_path_sig: string;

    //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
    @Column({ type: 'tinyint' })
    boardsubjectone_status_sig: SignatureStatus;

    //ลำดับที่
    @Column({ type: 'int', nullable: true, default: 1 })
    aboardsubjectone_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    boardsubjectone_time: Date;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: 'boardsubjecttwo_id' })
    boardsubjecttwo_id: fte_authority;
    //ลงชื่อ
    @Column({ type: 'varchar', length: 255, nullable: true })
    boardsubjecttwo_namesurname: string;

    //path ของ sig
    @Column({ type: 'varchar', length: 255, nullable: true })
    aboardsubjecttwo_path_sig: string;

    //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
    @Column({ type: 'tinyint' })
    boardsubjecttwo_status_sig: SignatureStatus;

    //ลำดับที่
    @Column({ type: 'int', nullable: true, default: 2 })
    aboardsubjecttwo_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    boardsubjectwo_time: Date;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: 'boardsubjectthree_id' })
    boardsubjectthree_id: fte_authority;
    //ลงชื่อ
    @Column({ type: 'varchar', length: 255, nullable: true })
    boardsubjectthree_namesurname: string;

    //path ของ sig
    @Column({ type: 'varchar', length: 255, nullable: true })
    aboardsubjectthree_path_sig: string;

    //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
    @Column({ type: 'tinyint' })
    boardsubjectthree_status_sig: SignatureStatus;

    //ลำดับที่
    @Column({ type: 'int', nullable: true, default: 3 })
    aboardsubjectthree_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    boardsubjectthree_time: Date;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: 'boardsubjectfour_id' })
    boardsubjectfour_id: fte_authority;
    //ลงชื่อ
    @Column({ type: 'varchar', length: 255, nullable: true })
    boardsubjectfour_namesurname: string;

    //path ของ sig
    @Column({ type: 'varchar', length: 255, nullable: true })
    aboardsubjectfour_path_sig: string;

    //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
    @Column({ type: 'tinyint' })
    boardsubjectfour_status_sig: SignatureStatus;

    //ลำดับที่
    @Column({ type: 'int', nullable: true, default: 4 })
    aboardsubjectfour_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    boardsubjectfour_time: Date;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: ' advisor_id' })
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
    @Column({ type: 'int', nullable: true, default: 5 })
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
    @Column({ type: 'int', nullable: true, default: 6 })
    mastersubject_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    mastersubject_time: Date;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: 'head_service_or_deanoffice_id' })
    head_service_or_deanoffice_id: fte_authority;
    //อนุมัติ
    @Column({ type: 'tinyint', width: 3, nullable: true })
    head_service_or_deanoffice_aprrove: number;

    //ไม่อนุมัติ
    @Column({ type: 'tinyint', width: 3, nullable: true })
    head_service_or_deanoffice_unapprove: number;

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
    @Column({ type: 'int', nullable: true, default: 7 })
    head_service_or_deanoffice_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    head_service_or_deanoffice_time: Date;

    @ManyToOne(type => fte_authority, { eager: false })
    @JoinColumn({ name: 'dean_id' })
    dean_id: fte_authority;
    //อนุมัติ
    @Column({ type: 'tinyint', width: 3, nullable: true })
    dean_aprrove: number;

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
    @Column({ type: 'int', nullable: true, default: 8 })
    dean_number_sig: number;

    //เวลา ลายเซ็น
    @Column({ type: 'timestamp', nullable: true })
    dean_time: Date;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}
