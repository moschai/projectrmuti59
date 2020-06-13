import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubjectRepository } from "./subject.repository";

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository
  ) {}

  async getSubjectsAll() {
    return await this.subjectRepository.find();
  }
}
