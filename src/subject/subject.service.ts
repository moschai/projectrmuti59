import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubjectRepository } from "./subject.repository";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { Subject } from "rxjs";
import { fte_subject } from "./subject.entity";

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository
  ) {}

  async getSubjectsAll() {
    return await this.subjectRepository.find();
  }

  async createSubject(createSubjectDto: CreateSubjectDto) {
    const subject = await this.subjectRepository.findOne({
      where: { id_subject: createSubjectDto.id_subject },
    });
    if (subject) {
      throw new ConflictException("มีรหัสรายวิชาอยู่แล้ว");
    }
    const newSubject = new fte_subject();
    newSubject.id_subject = createSubjectDto.id_subject;
    newSubject.name_subject = createSubjectDto.name_subject;
    newSubject.unit_subject = createSubjectDto.unit_subject;
    return await newSubject.save();
  }
}
