import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { fte_document_type_nine } from "./document-type-nine.entity";
import { fte_subject } from "src/subject/subject.entity";

@Entity()
export class fte_document_type_nine_table extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtable: number;

  @ManyToOne(
    (type) => fte_document_type_nine,
    (nine) => nine.tables,
    { eager: false }
  )
  @JoinColumn({ name: "idType" })
  type: fte_document_type_nine;

  @OneToOne((type) => fte_subject, { eager: true })
  @JoinColumn({ name: "subject" })
  subject: fte_subject;

  @Column({ type: "tinyint", width: 3 })
  subjectno: number;

  @Column({ type: "varchar", length: 128 })
  namesubject: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
