import {
  Controller,
  Post,
  ValidationPipe,
  Get,
  Body,
  UseGuards,
} from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("subject")
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  getAuthoritysAll() {
    return this.subjectService.getSubjectsAll();
  }

  @UseGuards(AuthGuard("jwt-admin"))
  @Post()
  createDocumentSubject(
    @Body(new ValidationPipe()) createSubjectDto: CreateSubjectDto
  ) {
    return this.subjectService.createSubject(createSubjectDto);
  }
}
