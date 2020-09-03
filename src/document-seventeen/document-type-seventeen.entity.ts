import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { fte_document } from "../document/document.entity";
import { fte_document_type_seventeen_table } from "./document-type-seventeen-table.entity";
import { fte_signature_seventeen } from "./signature-seventeen.entity";

@Entity()
export class fte_document_type_seventeen extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtype: number;

  @OneToOne(
    (type) => fte_document,
    (document) => document.type_seventeen,
    { eager: true }
  )
  document: fte_document;

  @OneToOne((type) => fte_signature_seventeen, { eager: true })
  @JoinColumn({ name: "id_signature" })
  signature: fte_signature_seventeen;

  @OneToMany(
    (type) => fte_document_type_seventeen_table,
    (table) => table.type,
    { eager: true }
  )
  tables: fte_document_type_seventeen_table[];

  @Column({ type: "varchar", length: 255 })
  signaturestd: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
