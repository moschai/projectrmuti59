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
import { fte_document_type_eight_table } from "./document-type-eight-table.entity";
import { fte_signature_eight } from "./signature-eight.entity";

@Entity()
export class fte_document_type_eight extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtype: number;

  @OneToOne(
    (type) => fte_document,
    (document) => document.type_eight,
    { eager: true }
  )
  document: fte_document;

  @OneToMany(
    (type) => fte_document_type_eight_table,
    (table) => table.type,
    { eager: true }
  )
  tables: fte_document_type_eight[];

  @OneToOne((type) => fte_signature_eight, { eager: true })
  @JoinColumn({ name: "id_signature" })
  signature: fte_signature_eight;

  @Column({ type: "tinyint", width: 5 })
  movinggroupterm: number;

  @Column({ type: "varchar", length: 128 })
  movinggroupyear: string;

  @Column({ type: "varchar", length: 128 })
  termstudy: string;

  @Column({ type: "varchar", length: 128 })
  yearstudy: string;

  @Column({ type: "varchar", length: 128 })
  classyear: string;

  @Column({ type: "varchar", length: 128 })
  timestudy: string;

  @Column({ type: "tinyint", width: 3 })
  since: number;

  @Column({ type: "varchar", length: 128 })
  othermassege: string;

  @Column({ type: "boolean", width: 3 })
  otherdocument: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  update: Date;
}
