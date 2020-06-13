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
import { fte_signature_five } from "./signature-five.entity";

@Entity()
export class fte_document_type_five extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtype: number;

  @OneToOne(
    (type) => fte_document,
    (document) => document.type_five,
    { eager: true }
  )
  document: fte_document;

  @OneToOne((type) => fte_signature_five, { eager: true })
  @JoinColumn({ name: "id_signature" })
  signature: fte_signature_five;

  @Column({ type: "tinyint", width: 3 })
  maintaintake: number;

  @Column({ type: "tinyint", width: 5 })
  takeleaveterm: number;

  @Column({ type: "tinyint", width: 5 })
  takeleaveyear: number;

  @Column({ type: "tinyint", width: 5 })
  takeleaveno: number;

  @Column({ type: "varchar", length: 512 })
  since: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
