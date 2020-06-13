import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { fte_document_type_seven } from "./document-type-seven.entity";
import { fte_subject } from "src/subject/subject.entity";

@Entity()
export class fte_document_type_seven_table extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtable: number;

  @ManyToOne(
    (type) => fte_document_type_seven,
    (seven) => seven.tables,
    { eager: false }
  )
  @JoinColumn({ name: "idType" })
  type: fte_document_type_seven;

  @OneToOne((type) => fte_subject, { eager: true })
  @JoinColumn({ name: "subject" })
  subject: fte_subject;

  @Column({ type: "tinyint", width: 3 })
  subjectno: number;

  @Column({ type: "varchar", length: 128 })
  namesubject: string;

  @Column({ type: "varchar", length: 128 })
  groupstudy: string;

  @Column({ type: "varchar", length: 255 })
  note: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated: Date;
}
