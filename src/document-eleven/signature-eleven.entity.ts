import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { fte_authority } from "src/authority/authority.entity";
import { fte_document_type_eleven } from "./document-type-eleven.entity";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Entity()
export class fte_signature_eleven extends BaseEntity {
  @PrimaryGeneratedColumn()
  idsig: number;

  @OneToOne(
    (type) => fte_document_type_eleven,
    (eleven) => eleven.signature,
    { eager: false }
  )
  type: fte_document_type_eleven;

  @ManyToOne((type) => fte_authority, { eager: true })
  @JoinColumn({ name: "advisor_id" })
  advisor_id: fte_authority;

  //ความคิดเห็น
  @Column({ type: "varchar", length: 255, nullable: true })
  advisor_comment: string;

  //path ของ sig
  @Column({ type: "varchar", length: 255, nullable: true })
  advisor_path_sig: string;

  //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
  @Column({ type: "tinyint" })
  advisor_status_sig: SignatureStatus;

  //ลำดับที่
  @Column({ type: "int", nullable: true, default: 1 })
  advisor_number_sig: number;

  //เวลา ลายเซ็น
  @Column({ type: "timestamp", nullable: true })
  advisor_time: Date;

  @ManyToOne((type) => fte_authority, { eager: true })
  @JoinColumn({ name: "mastersubject_id" })
  mastersubject_id: fte_authority;
  //ความคิดเห็น
  @Column({ type: "varchar", length: 255, nullable: true })
  mastersubject_comment: string;

  //path ของ sig
  @Column({ type: "varchar", length: 255, nullable: true })
  mastersubject_path_sig: string;

  //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
  @Column({ type: "tinyint" })
  mastersubject_status_sig: SignatureStatus;

  //ลำดับที่
  @Column({ type: "int", nullable: true, default: 2 })
  mastersubject_number_sig: number;

  //เวลา ลายเซ็น
  @Column({ type: "timestamp", nullable: true })
  mastersubject_time: Date;

  @ManyToOne((type) => fte_authority, { eager: true })
  @JoinColumn({ name: "head_service_or_deanoffice_id" })
  head_service_or_deanoffice_id: fte_authority;

  //อนุมัติ
  @Column({ type: "tinyint", width: 3, nullable: true })
  head_service_or_deanoffice_aprrove: number;

  //ความคิดเห็น
  @Column({ type: "varchar", length: 255, nullable: true })
  head_service_or_deanoffice_since: string;

  //path ของ sig
  @Column({ type: "varchar", length: 255, nullable: true })
  head_service_or_deanoffice_path_sig: string;

  //เวลา ลายเซ็น
  @Column({ type: "timestamp", nullable: true })
  head_service_or_deanoffice_termleavedate: Date;

  //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
  @Column({ type: "tinyint" })
  head_service_or_deanoffice_status_sig: SignatureStatus;

  //ลำดับที่
  @Column({ type: "int", nullable: true, default: 3 })
  head_service_or_deanoffice_number_sig: number;

  //เวลา ลายเซ็น
  @Column({ type: "timestamp", nullable: true })
  head_service_or_deanoffice_time: Date;

  @ManyToOne((type) => fte_authority, { eager: true })
  @JoinColumn({ name: "dean_id" })
  dean_id: fte_authority;
  //อนุมัติ
  @Column({ type: "tinyint", width: 3, nullable: true })
  dean_aprrove: number;

  //ความคิดเห็น
  @Column({ type: "varchar", length: 255, nullable: true })
  dean_since: string;
  //path ของ sig
  @Column({ type: "varchar", length: 255, nullable: true })
  dean_path_sig: string;

  //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
  @Column({ type: "tinyint" })
  dean_status_sig: SignatureStatus;

  //ลำดับที่
  @Column({ type: "int", nullable: true, default: 4 })
  dean_number_sig: number;

  //เวลา ลายเซ็น
  @Column({ type: "timestamp", nullable: true })
  dean_time: Date;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
