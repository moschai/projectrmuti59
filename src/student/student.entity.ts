import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { fte_document } from "src/document/document.entity";
import { fte_subject } from "../subject/subject.entity";
import { LevelEducation } from "src/document/enum/level-education.enum";
import { fte_major } from "src/authority/major.entity";

@Entity()
export class fte_student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    (type) => fte_document,
    (document) => document.student,
    { eager: false }
  )
  // @JoinColumn({name:'id_document'})
  document: fte_document;

  @ManyToOne(
    (type) => fte_major,
    (major) => major.student,
    { eager: true }
  )
  @JoinColumn({ name: "id_major" })
  major: fte_major;

  // @ManyToOne(type=>fte_lveducation,lvecducation=>lvecducation.student,{eager:true})
  // @JoinColumn({name:'id_lveducation'})
  // lveducation:fte_lveducation;

  // @ManyToOne(type => fte_subject, subject => subject.student, { eager: true })
  // @JoinColumn({ name: 'id_subject' })
  // subject: fte_subject;

  @Column({ length: 15, type: "varchar", nullable: false })
  id_std: string;

  @Column({ length: 20, type: "varchar", nullable: false })
  lveducation: LevelEducation;

  @Column({ length: 50, type: "varchar", nullable: false })
  name_std: string;

  @Column({ length: 50, type: "varchar", nullable: false })
  surname_std: string;

  @Column({ length: 10, type: "varchar", nullable: false })
  phone_std: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  timestamp: Date;
}
