import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";
import { fte_document_type_seventeen } from "./document-type-seventeen.entity";
import { fte_authority } from "src/authority/authority.entity";
import { fte_subject } from "src/subject/subject.entity";

@Entity()
export class fte_document_type_seventeen_table extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtable: number;

  @ManyToOne(
    (type) => fte_document_type_seventeen,
    (seventeen) => seventeen.tables,
    { eager: false }
  )
  @JoinColumn({ name: "idType" })
  type: fte_document_type_seventeen;

  @ManyToOne((type) => fte_subject, { eager: true })
  @JoinColumn({ name: "id_subject" })
  id_subject: fte_subject;

  @ManyToOne((type) => fte_authority, { eager: true })
  @JoinColumn({ name: "advisor_id" })
  advisor: fte_authority;

  @Column({ type: "tinyint", width: 3 })
  subjectno: number;

  @Column({ type: "varchar", length: 128 })
  namesubject: string;

  @Column({ type: "varchar", length: 128 })
  groupstudy: string;

  @Column({ type: "varchar", length: 255 })
  statusg: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  path_signature: string;

  @Column({ type: "varchar", length: 255 })
  groupsub: string;

  @Column({ type: "varchar", length: 255 })
  groupsubstruct: string;

  @Column({ type: "boolean", default: false })
  is_success: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
