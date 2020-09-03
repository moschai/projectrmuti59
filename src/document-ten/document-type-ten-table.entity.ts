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
import { fte_document_type_ten } from "./document-type-ten.entity";
import { fte_authority } from "src/authority/authority.entity";
import { fte_subject } from "src/subject/subject.entity";

@Entity()
export class fte_document_type_ten_table extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtable: number;

  @ManyToOne(
    (type) => fte_document_type_ten,
    (ten) => ten.tables,
    { eager: false }
  )
  @JoinColumn({ name: "idType" })
  type: fte_document_type_ten;

  @ManyToOne((type) => fte_subject, { eager: true })
  @JoinColumn({ name: "id_subject" })
  id_subject: fte_subject;

  @ManyToOne((type) => fte_subject, { eager: true })
  @JoinColumn({ name: "id_subject" })
  id_subjectnew: fte_subject;

  @ManyToOne((type) => fte_authority, { eager: true })
  @JoinColumn({ name: "advisor_id" })
  advisor: fte_authority;

  @Column({ type: "varchar", length: 128 })
  namecompare: string;

  @Column({ type: "tinyint", width: 3 })
  unitcompare: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  path_signature: string;

  @Column({ type: "boolean", default: false })
  is_success: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
