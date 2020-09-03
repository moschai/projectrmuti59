import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { fte_document_type_eight } from "./document-type-eight.entity";
import { fte_authority } from "src/authority/authority.entity";
import { fte_subject } from "src/subject/subject.entity";

@Entity()
export class fte_document_type_eight_table extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtable: number;

  @ManyToOne(
    (type) => fte_document_type_eight,
    (eight) => eight.tables,
    { eager: false }
  )
  @JoinColumn({ name: "idType" })
  type: fte_document_type_eight;

  @ManyToOne((type) => fte_subject, { eager: true })
  @JoinColumn({ name: "id_subject" })
  id_subject: fte_subject;

  @ManyToOne((type) => fte_authority, { eager: true })
  @JoinColumn({ name: "advisor_id" })
  advisor: fte_authority;

  @ManyToOne((type) => fte_authority, { eager: true })
  @JoinColumn({ name: "advisornew_id" })
  advisornew: fte_authority;

  @Column({ type: "tinyint", width: 15 })
  idsubject: number;

  @Column({ type: "varchar", length: 128 })
  namesubject: string;

  @Column({ type: "varchar", length: 128 })
  oldgroubstudy: string;

  @Column({ type: "varchar", length: 255 })
  path_signature: string;

  @Column({ type: "varchar", length: 255 })
  path_signaturelast: string;

  @Column({ type: "varchar", length: 128 })
  newgroupstudy: string;

  @Column({ type: "boolean", default: false })
  is_success: boolean;

  @Column({ type: "boolean", default: false })
  is_successlast: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
