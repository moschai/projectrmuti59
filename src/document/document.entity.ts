import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
// import { fte_doc_signature } from "./document-signature.entity";
import { fte_student } from "src/student/student.entity";
import { fte_document_type_one } from "../document-one/document-type-one.entity";
import { fte_document_type_two } from "../document-two/document-type-two.entity";
import { fte_document_type_three } from "../document-three/document-type-three.entity";
import { fte_document_type_four } from "../document-four/documet-type-four.entity";
import { fte_document_type_five } from "../document-five/document-type-five.entity";
import { fte_document_type_six } from "../document-six/document-type-six.entity";
import { fte_document_type_seven } from "../document-seven/document-type-seven.entity";
import { fte_document_type_eight } from "../document-eight/document-type-eight.entity";
import { fte_document_type_nine } from "../document-nine/document-type-nine.entity";
import { fte_document_type_ten } from "../document-ten/document-type-ten.entity";
import { fte_document_type_eleven } from "../document-eleven/document-type-eleven.entity";
import { fte_document_type_twelve } from "../document-twelve/document-type-twelve.entity";
import { fte_document_type_thirteen } from "../document-thirteen/document-type-thirteen.entity";
import { fte_document_type_fourteen } from "../document-fourteen/document-type-fourteen.entity";
import { fte_document_type_fifteen } from "../document-fifteen/document-type-fifteen.entity";
import { fte_document_type_sixteen } from "../document-sixteen/document-type-sixteen.entity";
import { fte_document_type_seventeen } from "../document-seventeen/document-type-seventeen.entity";
import { fte_document_type_eighteen } from "../document-eighteen/document-type-eighteen.entity";
import { fte_authority } from "src/authority/authority.entity";

@Entity()
export class fte_document extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToMany(type => fte_doc_signature, signature => signature.document, { eager: true })
  // signature: fte_doc_signature[];

  @ManyToOne(
    (type) => fte_authority,
    (authority) => authority.document,
    { eager: true }
  )
  @JoinColumn({ name: "id_nextSignature" })
  nextSignature: fte_authority;

  @OneToOne((type) => fte_student, { eager: true })
  @JoinColumn({ name: "id_student" })
  student: fte_student;

  @OneToOne((type) => fte_document_type_one, { eager: false })
  @JoinColumn({ name: "id_type_one" })
  type_one: fte_document_type_one;

  @OneToOne((type) => fte_document_type_two, { eager: false })
  @JoinColumn({ name: "id_type_two" })
  type_two: fte_document_type_two;

  @OneToOne((type) => fte_document_type_three, { eager: false })
  @JoinColumn({ name: "id_type_three" })
  type_three: fte_document_type_three;

  @OneToOne((type) => fte_document_type_four, { eager: false })
  @JoinColumn({ name: "id_type_four" })
  type_four: fte_document_type_four;

  @OneToOne((type) => fte_document_type_five, { eager: false })
  @JoinColumn({ name: "id_type_five" })
  type_five: fte_document_type_five;

  @OneToOne((type) => fte_document_type_six, { eager: false })
  @JoinColumn({ name: "id_type_six" })
  type_six: fte_document_type_six;

  @OneToOne((type) => fte_document_type_seven, {
    eager: false,
  })
  @JoinColumn({ name: "id_type_seven" })
  type_seven: fte_document_type_seven;

  @OneToOne((type) => fte_document_type_eight, { eager: false })
  @JoinColumn({ name: "id_type_eight" })
  type_eight: fte_document_type_eight;

  @OneToOne((type) => fte_document_type_nine, { eager: false })
  @JoinColumn({ name: "id_type_nine" })
  type_nine: fte_document_type_nine;

  @OneToOne((type) => fte_document_type_ten, { eager: false })
  @JoinColumn({ name: "id_type_ten" })
  type_ten: fte_document_type_ten;

  @OneToOne((type) => fte_document_type_eleven, { eager: false })
  @JoinColumn({ name: "id_type_eleven" })
  type_eleven: fte_document_type_eleven;

  @OneToOne((type) => fte_document_type_twelve, { eager: false })
  @JoinColumn({ name: "id_type_twelve" })
  type_twelve: fte_document_type_twelve;

  @OneToOne((type) => fte_document_type_thirteen, { eager: false })
  @JoinColumn({ name: "id_type_thirteen" })
  type_thirteen: fte_document_type_thirteen;

  @OneToOne((type) => fte_document_type_fourteen, { eager: false })
  @JoinColumn({ name: "id_type_fourteen" })
  type_fourteen: fte_document_type_fourteen;

  @OneToOne((type) => fte_document_type_fifteen, { eager: false })
  @JoinColumn({ name: "id_type_fifteen" })
  type_fifteen: fte_document_type_fifteen;

  @OneToOne((type) => fte_document_type_sixteen, { eager: false })
  @JoinColumn({ name: "id_type_sixteen" })
  type_sixteen: fte_document_type_sixteen;

  @OneToOne((type) => fte_document_type_seventeen, { eager: false })
  @JoinColumn({ name: "id_type_seventeen" })
  type_seventeen: fte_document_type_seventeen;

  @OneToOne((type) => fte_document_type_eighteen, { eager: false })
  @JoinColumn({ name: "id_type_eighteen" })
  type_eighteen: fte_document_type_eighteen;

  @Column({ width: 3, type: "tinyint", nullable: false })
  type_document: number;

  @Column({ length: 255, type: "varchar", nullable: true })
  document_pdf: string;

  @Column({ width: 3, type: "tinyint", default: 1, nullable: false })
  ststus_doc: number;

  @Column({ width: 3, type: "tinyint", default: 1, nullable: false })
  number_sig: number;

  @Column({ type: "boolean", default: false, nullable: false })
  isAllSignature: boolean;

  @Column({ type: "boolean", default: false, nullable: false })
  hasTableSignature: boolean;

  @Column({ type: "boolean", default: false, nullable: false })
  isAllTableSignature: boolean;

  @Column({ width: 1, type: "int", nullable: true })
  semester: number;

  @Column({ length: 50, type: "varchar", nullable: true })
  year_education: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @UpdateDateColumn({ type: "timestamp" })
  timestamp: Date;
}
