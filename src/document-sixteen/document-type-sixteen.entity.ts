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
import { fte_signature_sixteen } from "./signature-sixteen.entity";

@Entity()
export class fte_document_type_sixteen extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtype: number;

  @OneToOne(
    (type) => fte_document,
    (document) => document.type_sixteen,
    { eager: true }
  )
  document: fte_document;

  @OneToOne((type) => fte_signature_sixteen, { eager: true })
  @JoinColumn({ name: "id_signature" })
  signature: fte_signature_sixteen;

  @Column({ type: "tinyint", width: 5 })
  delaygraduationterm: number;

  @Column({ type: "tinyint", width: 5 })
  delaygraduationyear: number;

  @Column({ type: "varchar", length: 512 })
  delaygraduationsince: string;

  @Column({ type: "varchar", length: 128 })
  classyear: string;

  @Column({ type: "tinyint", width: 3 })
  timestudy: number;

  @Column({ type: "tinyint", width: 5 })
  typestudy: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
