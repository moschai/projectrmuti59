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
import { fte_document_type_fourteen } from "./document-type-fourteen.entity";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Entity()
export class fte_signature_fourteen extends BaseEntity {
  @PrimaryGeneratedColumn()
  idsig: number;

  @OneToOne(
    (type) => fte_document_type_fourteen,
    (fourteen) => fourteen.signature,
    { eager: false }
  )
  type: fte_document_type_fourteen;

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
  @JoinColumn({ name: "head_student_development_id" })
  head_student_development_id: fte_authority;
  //ความคิดเห็น
  @Column({ type: "varchar", length: 255, nullable: true })
  head_student_development_comment: string;

  //path ของ sig
  @Column({ type: "varchar", length: 255, nullable: true })
  head_student_development_path_sig: string;

  //เวลา ลายเซ็น
  @Column({ type: "timestamp", nullable: true })
  head_student_development_termleavedate: Date;

  //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
  @Column({ type: "tinyint" })
  head_student_development_status_sig: SignatureStatus;

  //ลำดับที่
  @Column({ type: "int", nullable: true, default: 3 })
  head_student_development_number_sig: number;

  //เวลา ลายเซ็น
  @Column({ type: "timestamp", nullable: true })
  head_student_development_time: Date;

  @ManyToOne((type) => fte_authority, { eager: true })
  @JoinColumn({ name: "deputy_dean_student_development_id" })
  deputy_dean_student_development_id: fte_authority;

  //ความคิดเห็น
  @Column({ type: "varchar", length: 255, nullable: true })
  deputy_dean_student_development_comment: string;

  //path ของ sig
  @Column({ type: "varchar", length: 255, nullable: true })
  deputy_dean_student_development_path_sig: string;

  //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
  @Column({ type: "tinyint" })
  deputy_dean_student_development_status_sig: SignatureStatus;

  //ลำดับที่
  @Column({ type: "int", nullable: true, default: 4 })
  deputy_dean_student_development_number_sig: number;

  //เวลา ลายเซ็น
  @Column({ type: "timestamp", nullable: true })
  deputy_dean_student_development_time: Date;

  @ManyToOne((type) => fte_authority, { eager: true })
  @JoinColumn({ name: " dean_id" })
  dean_id: fte_authority;
  //อนุมัติ
  @Column({ type: "tinyint", width: 3, nullable: true })
  dean_aprrove: number;

  //เนื่องจาก
  @Column({ type: "varchar", length: 255, nullable: true })
  dean_since: string;

  //path ของ sig
  @Column({ type: "varchar", length: 255, nullable: true })
  dean_path_sig: string;

  //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
  @Column({ type: "tinyint" })
  dean_status_sig: SignatureStatus;

  //ลำดับที่
  @Column({ type: "int", nullable: true, default: 5 })
  dean_number_sig: number;

  //เวลา ลายเซ็น
  @Column({ type: "timestamp", nullable: true })
  dean_time: Date;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
