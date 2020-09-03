import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { fte_authority } from "src/authority/authority.entity";
import { fte_document_type_fifteen } from "./document-type-fifteen.entity";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Entity()
export class fte_signature_fifteen extends BaseEntity {
  @PrimaryGeneratedColumn()
  idsig: number;

  @OneToOne(
    (type) => fte_document_type_fifteen,
    (fifteen) => fifteen.signature,
    { eager: false }
  )
  type: fte_document_type_fifteen;

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
  @JoinColumn({ name: "authority_activity_id" })
  authority_activity_id: fte_authority;

  //ผ่านกิจกรรม
  @Column({ type: "tinyint", width: 3, nullable: true })
  std_notorpass_activity: number;

  @Column({ type: "tinyint", width: 3, nullable: true })
  std_activityunit: number;

  @Column({ type: "boolean", width: 3 })
  other_activityst: boolean;

  @Column({ type: "boolean", width: 3 })
  other_activitystone: boolean;
  @Column({ type: "boolean", width: 3 })
  other_activitysttwo: boolean;
  @Column({ type: "boolean", width: 3 })
  other_activitystthree: boolean;

  //อื่นๆ
  @Column({ type: "tinyint", width: 3, nullable: true })
  other_activity: number;
  //ข้อความ
  @Column({ type: "varchar", length: 128, nullable: true })
  commentone_activity: string;
  @Column({ type: "varchar", length: 128, nullable: true })
  commenttwo_activity: string;
  @Column({ type: "varchar", length: 128, nullable: true })
  commentthree_activity: string;

  //path ของ sig
  @Column({ type: "varchar", length: 255, nullable: true })
  authority_activity_path_sig: string;

  //เวลา ลายเซ็น
  @Column({ type: "timestamp", nullable: true })
  authority_activity_date: Date;

  //status การเซ็น (เซ็นแล้ว ยังไม่เซ็น)
  @Column({ type: "tinyint" })
  authority_activity_status_sig: SignatureStatus;

  //ลำดับที่
  @Column({ type: "int", nullable: true, default: 3 })
  authority_activity_number_sig: number;

  //เวลา ลายเซ็น
  @Column({ type: "timestamp", nullable: true })
  authority_activity_time: Date;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
