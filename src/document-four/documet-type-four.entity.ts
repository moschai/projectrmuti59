import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { fte_document } from "../document/document.entity";
import { fte_signature_four } from "./signature-four.entity";

@Entity()
export class fte_document_type_four extends BaseEntity {
  @PrimaryGeneratedColumn()
  idfour: number;

  @OneToOne(
    (type) => fte_document,
    (document) => document.type_four,
    { eager: true }
  )
  document: fte_document;

  @OneToOne((type) => fte_signature_four, { eager: true })
  @JoinColumn({ name: "id_signature" })
  signature: fte_signature_four;

  @Column({ type: "tinyint", width: 5 })
  sumorremainunit: number;

  @Column({ type: "varchar", length: 512 })
  overlowstandardsince: string;

  @Column({ type: "tinyint", width: 5 })
  overlowstandard: number;

  @Column({ type: "varchar", length: 128 })
  dear: string;

  @Column({ type: "varchar", length: 128 })
  termstudy: string;

  @Column({ type: "varchar", length: 128 })
  yearstudy: string;

  @Column({ type: "varchar", length: 128 })
  cumulativeGpa: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
