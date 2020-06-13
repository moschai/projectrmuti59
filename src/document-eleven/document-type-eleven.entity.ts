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
  otherchangehistory: string;

  @Column({ type: "varchar", length: 255 })
  oldhistory: string;

  @Column({ type: "varchar", length: 255 })
  newhistory: string;

  @Column({ type: "varchar", length: 128 })
  newnamehistory: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
