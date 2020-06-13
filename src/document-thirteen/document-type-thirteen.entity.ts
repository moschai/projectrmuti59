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

  @Column({ type: "tinyint", width: 3 })
  cersuccessunitthai: number;

  @Column({ type: "boolean", width: 3 })
  certificateregister: boolean;

  @Column({ type: "boolean", width: 3 })
  cerregisterthaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  cerregisterunitthai: number;

  @Column({ type: "boolean", width: 3 })
  transcripstudy: boolean;

  @Column({ type: "boolean", width: 3 })
  transcripthaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  transcripunitthai: number;

  @Column({ type: "boolean", width: 3 })
  transcripengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  transcripuniteng: number;

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
  dimplomalvone: boolean;

  @Column({ type: "boolean", width: 3 })
  dpmlvonethaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  dpmlvoneunitthai: number;

  @Column({ type: "boolean", width: 3 })
  dpmlvoneengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  dpmlvoneuniteng: number;

  @Column({ type: "boolean", width: 3 })
  dimplomalvtwo: boolean;

  @Column({ type: "boolean", width: 3 })
  dpmlvtwothaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  dpmlvtwounitthai: number;

  @Column({ type: "boolean", width: 3 })
  dpmlvtwoengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  dpmlvtwouniteng;

  @Column({ type: "boolean", width: 3 })
  dimplomalvthree: boolean;

  @Column({ type: "boolean", width: 3 })
  dpmlvthreethaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  dpmlvthreeunitthai: number;

  @Column({ type: "boolean", width: 3 })
  dpmlvthreeengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  dpmlvthreeuniteng: number;

  @Column({ type: "boolean", width: 3 })
  dimplomalvfour: boolean;

  @Column({ type: "boolean", width: 3 })
  dpmlvfourthaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  dpmlvfourunitthai: number;

  @Column({ type: "boolean", width: 3 })
  dpmlvfourengversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  dpmlvfouruniteng: number;

  @Column({ type: "tinyint", width: 3 })
  loststudentcard: number;

  @Column({ type: "boolean", width: 3 })
  certificateunit: boolean;

  @Column({ type: "boolean", width: 3 })
  ctfcthaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  ctfcunitthai: number;

  @Column({ type: "varchar", length: 128 })
  othermassege: string;

  @Column({ type: "boolean", width: 3 })
  otherdocument: boolean;

  @Column({ type: "boolean", width: 3 })
  otherdocthaiversion: boolean;

  @Column({ type: "tinyint", width: 3 })
  otherdocunitthai: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  signature_std: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
