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
import { fte_signature_fourteen } from "./signature-fourteen.entity";

@Entity()
export class fte_document_type_fourteen extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtype: number;

  @OneToOne(
    (type) => fte_document,
    (document) => document.type_fourteen,
    { eager: true }
  )
  document: fte_document;

  @OneToOne((type) => fte_signature_fourteen, { eager: true })
  @JoinColumn({ name: "id_signature" })
  signature: fte_signature_fourteen;

  @Column({ type: "varchar", length: 512 })
  behavioralreceipt: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
