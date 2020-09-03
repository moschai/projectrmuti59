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

@Entity()
export class fte_document_type_thirteen extends BaseEntity {
  @PrimaryGeneratedColumn()
  idtype: number;

  @OneToOne(
    (type) => fte_document,
    (document) => document.type_thirteen,
    { eager: true }
  )
  document: fte_document;

  @Column({ type: "varchar", length: 255 })
  nameeng: string;

  @Column({ type: "varchar", length: 255 })
  surnameeng: string;

  @Column({ type: "varchar", length: 255 })
  currentaddress: string;

  @Column({ type: "varchar", length: 255 })
  daystudy: string;

  @Column({ type: "varchar", length: 255 })
  daysuccessstudy: string;

  @Column({ type: "boolean", width: 3 })
  certificateTsc: boolean;

  @Column({ type: "boolean", width: 3 })
  cerTscthaiversion: boolean;

  @Column({ type: "boolean", width: 3 })
  cerTscengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  cerTscunitthai: number;

  @Column({ type: "tinyint", width: 3 })
  cerTscuniteng: number;

  @Column({ type: "boolean", width: 3 })
  certificatestudy: boolean;

  @Column({ type: "boolean", width: 3 })
  cerstudythaiversion: boolean;

  @Column({ type: "boolean", width: 3 })
  cerstudyengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  cerstudyunitthai: number;

  @Column({ type: "tinyint", width: 3 })
  cerstudyuniteng: number;

  @Column({ type: "boolean", width: 3 })
  certificatesuccess: boolean;

  @Column({ type: "boolean", width: 3 })
  cersuccessthaiversion: boolean;

  @Column({ type: "boolean", width: 3 })
  cersuccessengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  cersuccessunitthai: number;

  @Column({ type: "tinyint", width: 3 })
  cersuccessuniteng: number;

  @Column({ type: "boolean", width: 3 })
  certificateregister: boolean;

  @Column({ type: "boolean", width: 3 })
  cerregisterthaiversion: boolean;

  @Column({ type: "boolean", width: 3 })
  cerregisterengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  cerregisterunitthai: number;

  @Column({ type: "tinyint", width: 3 })
  cerregisteruniteng: number;

  @Column({ type: "boolean", width: 3 })
  certificatestdcard: boolean;

  @Column({ type: "boolean", width: 3 })
  cerstdcardthaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  cerstdcardunitthai: number;

  @Column({ type: "boolean", width: 3 })
  cerstdcardengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  cerstdcarduniteng: number;

  @Column({ type: "boolean", width: 3 })
  otherstudy: boolean;

  @Column({ type: "boolean", width: 3 })
  otherstudythaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  otherstudyunitthai: number;

  @Column({ type: "boolean", width: 3 })
  otherstudyengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  otherstudyuniteng: number;

  @Column({ type: "varchar", length: 255 })
  otherstudymessage: string;

  @Column({ type: "boolean", width: 3 })
  transcripsuccess: boolean;

  @Column({ type: "boolean", width: 3 })
  tcsuccessthaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  tcsuccessunitthai: number;

  @Column({ type: "boolean", width: 3 })
  tcsuccessengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  tcsuccessuniteng: number;

  @Column({ type: "boolean", width: 3 })
  boardcerapprove: boolean;

  @Column({ type: "boolean", width: 3 })
  boardcerapprovethaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  boardcerapproveunitthai: number;

  @Column({ type: "boolean", width: 3 })
  boardcerapproveengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  boardcerapproveuniteng: number;

  @Column({ type: "boolean", width: 3 })
  cersuccessstudy: boolean;

  @Column({ type: "boolean", width: 3 })
  cersuccessstudythaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  cersuccessstudyunitthai: number;

  @Column({ type: "boolean", width: 3 })
  cersuccessstudyengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  cersuccessstudyuniteng: number;

  @Column({ type: "boolean", width: 3 })
  substitudedimploma: boolean;

  @Column({ type: "boolean", width: 3 })
  substitudedimplomathaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  substitudedimplomaunitthai: number;

  @Column({ type: "boolean", width: 3 })
  substitudedegree: boolean;

  @Column({ type: "boolean", width: 3 })
  substitudedegreethaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  substitudedegreeunitthai: number;

  @Column({ type: "boolean", width: 3 })
  Translationdimploma: boolean;

  @Column({ type: "boolean", width: 3 })
  Translationdimplomaengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  Translationdimplomauniteng: number;

  @Column({ type: "boolean", width: 3 })
  Translationdegree: boolean;

  @Column({ type: "boolean", width: 3 })
  Translationdegreeengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  Translationdegreeuniteng: number;

  @Column({ type: "boolean", width: 3 })
  othersuccessstudy: boolean;

  @Column({ type: "boolean", width: 3 })
  othersuccessstudythaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  othersuccessstudyunitthai: number;

  @Column({ type: "boolean", width: 3 })
  othersuccessstudyengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  othersuccessstudyuniteng: number;

  @Column({ type: "varchar", length: 255 })
  othersuccessstudymessage: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  signature_std: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
