import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";

import { fte_major } from "./major.entity";
import { fte_student } from "src/student/student.entity";
import { fte_document } from "src/document/document.entity";
import { fte_faculty } from "./faculty.entity";
import { EPositionAuthority } from "./enum/position-authority.enum";

@Entity()
@Unique(["username"])
export class fte_authority extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_authority: number;

  @ManyToOne(
    (type) => fte_faculty,
    (faculty) => faculty.major,
    { eager: true }
  )
  @JoinColumn({ name: "id_faculty" })
  faculty: fte_faculty;

  @ManyToOne(
    (type) => fte_major,
    (major) => major.authority,
    { eager: true }
  )
  @JoinColumn({ name: "id_major" })
  major: fte_major;

  @OneToMany(
    (type) => fte_document,
    (document) => document.nextSignature,
    { eager: false }
  )
  document: fte_document[];

  @Column({ type: "varchar", length: 50, select: false })
  username: string;

  @Column({ type: "text", select: false })
  password: string;

  @Column({ type: "text", select: false })
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    // console.log(password, this.salt);
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  @Column({ type: "varchar", length: 50 })
  name_authority: string;

  @Column({ type: "varchar", length: 50 })
  surname_authority: string;

  @Column({ type: "varchar", length: 255 })
  signature: string;

  @Column({ type: "varchar", length: 255 })
  position_authority: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  update: Date;
}
