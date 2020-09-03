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
import { fte_document_type_seven_table } from "./document-type-seven-table.entity";
import { fte_document_type_seventeen } from "../document-seventeen/document-type-seventeen.entity";
import { fte_signature_seven } from "./signature-seven.entity";

@Entity()
export class fte_document_type_seven extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtype: number;

  @OneToOne(
    (type) => fte_document,
    (document) => document.type_seven,
    { eager: false }
  )
  document: fte_document;

  @OneToMany(
    (type) => fte_document_type_seven_table,
    (table) => table.type,
    { eager: true }
  )
  tables: fte_document_type_seven_table[];

  @OneToOne((type) => fte_signature_seven, { eager: true })
  @JoinColumn({ name: "id_signature" })
  signature: fte_signature_seven;

  @Column({ type: "tinyint", width: 3 })
  termregister: number;

  @Column({ type: "varchar", length: 128 })
  yearregister: string;

  @Column({ type: "varchar", length: 128 })
  classyear: string;

  @Column({ type: "tinyint", width: 3 })
  timestudy: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
