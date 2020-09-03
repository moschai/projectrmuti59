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
import { fte_signature_eleven } from "./signature-eleven.entity";

@Entity()
export class fte_document_type_eleven extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtype: number;

  @OneToOne(
    (type) => fte_document,
    (document) => document.type_eleven,
    { eager: true }
  )
  document: fte_document;

  @OneToOne((type) => fte_signature_eleven, { eager: true })
  @JoinColumn({ name: "id_signature" })
  signature: fte_signature_eleven;

  @Column({ type: "tinyint", width: 3 })
  changehistory: number;

  @Column({ type: "varchar", length: 128 })
  othermassege: string;

  @Column({ type: "boolean", width: 3 })
  otherdocument: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
