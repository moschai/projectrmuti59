import { EntityRepository, Repository } from "typeorm";
import { fte_document } from "./document.entity";
import { fte_student } from "src/student/student.entity";
import { SignatureStatus } from "./enum/signature-status.enum";
import { CreateDocumentOneDto } from "src/document-one/dto/create-document-one.dto";
import { fte_document_type_one } from "src/document-one/document-type-one.entity";
import { fte_document_type_two } from "src/document-two/document-type-two.entity";
import { fte_document_type_three } from "src/document-three/document-type-three.entity";
import { fte_document_type_four } from "src/document-four/documet-type-four.entity";
import { fte_document_type_five } from "src/document-five/document-type-five.entity";
import { fte_document_type_nine } from "src/document-nine/document-type-nine.entity";
import { fte_document_type_eleven } from "src/document-eleven/document-type-eleven.entity";
import { fte_document_type_twelve } from "src/document-twelve/document-type-twelve.entity";
import { fte_document_type_fourteen } from "src/document-fourteen/document-type-fourteen.entity";
import { fte_document_type_fifteen } from "src/document-fifteen/document-type-fifteen.entity";
import { fte_document_type_sixteen } from "src/document-sixteen/document-type-sixteen.entity";
import { fte_document_type_seven } from "src/document-seven/document-type-seven.entity";
import { fte_document_type_six } from "src/document-six/document-type-six.entity";
import { fte_document_type_eight } from "src/document-eight/document-type-eight.entity";
import { fte_document_type_ten } from "src/document-ten/document-type-ten.entity";
import { fte_document_type_thirteen } from "src/document-thirteen/document-type-thirteen.entity";
import { fte_document_type_seventeen } from "src/document-seventeen/document-type-seventeen.entity";

@EntityRepository(fte_document)
export class DocumentRepository extends Repository<fte_document> {
  // async createDocument(
  //     createDocument: any,
  //     student: fte_student
  // ) {
  //     const document = new fte_document();
  //     document.student = student;
  //     document.type_document = createDocument.type_document;
  //     document.semester = createDocument.semester;
  //     document.year_education = createDocument.year_education;
  //     await this.save(document);

  //     const signatures = [];
  //     createDocument.signatures.forEach(signature => {
  //         signatures.push({
  //             catagory_sig: signature.catagory_sig,
  //             status_sig: SignatureStatus.create,
  //             authority: signature.id_authority,
  //             number_sig: signature.number_sig,
  //             document: document
  //         })
  //     })

  //     await this.createQueryBuilder()
  //         .insert()
  //         .into(fte_doc_signature)
  //         .values(signatures)
  //         .execute()

  //     return await this.findOne({ id: document.id })
  // }

  async createDocumentTypeOne(
    student: fte_student,
    documentOne: fte_document_type_one
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_one = documentOne;
    document.type_document = 1;
    document.nextSignature = documentOne.signature.advisor_id;
    return await document.save();
  }

  async createDocumentTypeTwo(
    student: fte_student,
    documentTwo: fte_document_type_two
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_two = documentTwo;
    document.type_document = 2;
    document.nextSignature = documentTwo.signature.advisor_id;
    return await document.save();
  }

  async createDocumentTypeThree(
    student: fte_student,
    documentThree: fte_document_type_three
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_three = documentThree;
    document.type_document = 3;
    document.nextSignature = documentThree.signature.advisor_id;
    return await document.save();
  }

  async createDocumentTypeFour(
    student: fte_student,
    documentFour: fte_document_type_four
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_four = documentFour;
    document.type_document = 4;
    document.nextSignature = documentFour.signature.advisor_id;
    return await document.save();
  }

  async createDocumentTypeFive(
    student: fte_student,
    documentFive: fte_document_type_five
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_five = documentFive;
    document.type_document = 5;
    document.nextSignature = documentFive.signature.advisor_id;
    return await document.save();
  }

  async createDocumentTypeNine(
    student: fte_student,
    documentNine: fte_document_type_nine
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_nine = documentNine;
    document.type_document = 9;
    document.nextSignature = documentNine.signature.advisor_id;
    return await document.save();
  }

  async createDocumentTypeEleven(
    student: fte_student,
    documentEleven: fte_document_type_eleven
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_eleven = documentEleven;
    document.type_document = 11;
    document.nextSignature = documentEleven.signature.advisor_id;
    return await document.save();
  }

  async createDocumentTypeTwelve(
    student: fte_student,
    documentTwelve: fte_document_type_twelve
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_twelve = documentTwelve;
    document.type_document = 12;
    document.nextSignature = documentTwelve.signature.advisor_id;
    return await document.save();
  }

  async createDocumentTypeFourteen(
    student: fte_student,
    documentFourteen: fte_document_type_fourteen
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_fourteen = documentFourteen;
    document.type_document = 14;
    document.nextSignature = documentFourteen.signature.advisor_id;
    return await document.save();
  }

  async createDocumentTypeFifteen(
    student: fte_student,
    documentFifteen: fte_document_type_fifteen
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_fifteen = documentFifteen;
    document.type_document = 15;
    document.nextSignature = documentFifteen.signature.advisor_id;
    return await document.save();
  }

  async createDocumentTypeSixteen(
    student: fte_student,
    documentSixteen: fte_document_type_sixteen
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_sixteen = documentSixteen;
    document.type_document = 16;
    document.nextSignature = documentSixteen.signature.advisor_id;
    return await document.save();
  }

  async createDocumentTypeSeven(
    student: fte_student,
    documentSeven: fte_document_type_seven
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_seven = documentSeven;
    document.type_document = 7;
    document.nextSignature = documentSeven.signature.advisor_id;
    return await document.save();
  }

  async createDocumentTypeSix(
    student: fte_student,
    documentSix: fte_document_type_six
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_six = documentSix;
    document.type_document = 6;
    document.nextSignature = documentSix.signature.advisor_id;
    document.hasTableSignature = true;
    return await document.save();
  }

  async createDocumentTypeEight(
    student: fte_student,
    documentEight: fte_document_type_eight
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_eight = documentEight;
    document.type_document = 8;
    document.nextSignature = documentEight.signature.advisor_id;
    document.hasTableSignature = true;
    return await document.save();
  }

  async createDocumentTypeTen(
    student: fte_student,
    documentTen: fte_document_type_ten
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_ten = documentTen;
    document.type_document = 10;
    document.nextSignature = documentTen.signature.boardsubjectone_id;
    document.hasTableSignature = true;
    return await document.save();
  }

  async createDocumentTypeThirteen(
    student: fte_student,
    documentThirteen: fte_document_type_thirteen
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_thirteen = documentThirteen;
    document.type_document = 13;
    // document.nextSignature = documentThirteen.signature.studentt_id;
    return await document.save();
  }

  async createDocumentTypeSeventeen(
    student: fte_student,
    documentSeventeen: fte_document_type_seventeen
  ): Promise<fte_document> {
    const document = new fte_document();
    document.student = student;
    document.type_seventeen = documentSeventeen;
    document.type_document = 17;
    document.nextSignature = documentSeventeen.signature.advisor_id;
    return await document.save();
  }

  // async  createDocumentTypeTwo(
  //     student: fte_student,
  //     documentOne: fte_document_type_one
  // ): Promise<fte_document> {
  //     const document = new fte_document();
  //     document.student = student;
  //     document.type_one = documentOne;
  //     document.type_document = 1;
  //     document.nextSignature = documentOne.signature.advisor_id;
  //     return await document.save();
  // }
}
