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
import { fte_signature_twelve } from "./signature-twelve.entity";

@Entity()
export class fte_document_type_twelve extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtype: number;

  @OneToOne(
    (type) => fte_document,
    (document) => document.type_twelve,
    { eager: true }
  )
  document: fte_document;

  @OneToOne((type) => fte_signature_twelve, { eager: true })
  @JoinColumn({ name: "id_signature" })
  signature: fte_signature_twelve;

  @Column({ type: "varchar", length: 512 })
  resignsince: string;

  @Column({ type: "varchar", length: 128 })
  nameparent: string;

  @Column({ type: "varchar", length: 128 })
  surname: string;

  @Column({ type: "varchar", length: 128 })
  signatureteacher: string;

  @Column({ type: "varchar", length: 10 })
  phoneparent: string;

  @Column({ type: "varchar", length: 255 })
  signatureparent: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
