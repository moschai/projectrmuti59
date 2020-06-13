import { EntityRepository, Repository } from "typeorm";
import { fte_student } from "./student.entity";
import { fte_document } from "src/document/document.entity";
// import { fte_lveducation } from "./lveducation.entity";
import { fte_subject } from "../subject/subject.entity";
import { CreateDocumentOneDto } from "src/document-one/dto/create-document-one.dto";
import { CreateDocumentTwoDto } from "src/document-two/dto/create-document-two.dto";

@EntityRepository(fte_student)
export class StudentRepository extends Repository<fte_student> {
  async createStudent(createDocumentDto: any) {
    const student = new fte_student();
    // student.document=document;

    student.id_std = createDocumentDto.id_std;
    student.name_std = createDocumentDto.name_std;
    student.surname_std = createDocumentDto.surname_std;
    student.lveducation = createDocumentDto.lveducation;
    student.phone_std = createDocumentDto.phone_std;

    return await this.save(student);
  }
}
