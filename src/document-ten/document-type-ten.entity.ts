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
import { fte_document_type_ten_table } from "./document-type-ten-table.entity";
import { fte_signature_ten } from "./signature-ten.entity";

@Entity()
export class fte_document_type_ten extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtype: number;

  @OneToOne(
    (type) => fte_document,
    (document) => document.type_ten,
    { eager: true }
  )
  document: fte_document;

  @OneToMany(
    (type) => fte_document_type_ten_table,
    (table) => table.type,
    { eager: true }
  )
  tables: fte_document_type_ten[];

  @OneToOne((type) => fte_signature_ten, { eager: true })
  @JoinColumn({ name: "id_signature" })
  signature: fte_signature_ten;

  @Column({ type: "tinyint", width: 3 })
  compareterm: number;

  @Column({ type: "varchar", length: 128 })
  compareyeat: string;

  @Column({ type: "varchar", length: 128 })
  cumulativeGpa: string;

  @Column({ type: "varchar", length: 128 })
  dear: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
