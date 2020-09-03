import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { fte_authority } from "src/authority/authority.entity";
import { fte_document_type_seventeen } from "./document-type-seventeen.entity";
import { SignatureStatus } from "src/document/enum/signature-status.enum";

@Entity()
export class fte_signature_seventeen extends BaseEntity {
  @PrimaryGeneratedColumn()
  idsig: number;

  @OneToOne(
    (type) => fte_document_type_seventeen,
    (seventeen) => seventeen.signature,
    { eager: false }
  )
  type: fte_document_type_seventeen;
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

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
