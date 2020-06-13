import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { fte_document_type_ten } from "./document-type-ten.entity";
import { fte_authority } from "src/authority/authority.entity";

@Entity()
export class fte_document_type_ten_table extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtable: number;

  @ManyToOne(
    (type) => fte_document_type_ten,
    (ten) => ten.tables,
    { eager: false }
  )
  @JoinColumn({ name: "idType" })
  type: fte_document_type_ten;

  @ManyToOne((type) => fte_authority, { eager: true })
  @JoinColumn({ name: "advisor_id" })
  advisor: fte_authority;

  @Column({ type: "tinyint", width: 3 })
  idcompare: number;

  @Column({ type: "varchar", length: 128 })
  namecompare: string;

  @Column({ type: "tinyint", width: 3 })
  unitcompare: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  path_signature: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
