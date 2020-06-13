import { Controller, Post, ValidationPipe, Get } from "@nestjs/common";
import { SubjectService } from "./subject.service";

@Controller("subject")
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  getAuthoritysAll() {
    return this.subjectService.getSubjectsAll();
  }
}
