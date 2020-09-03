import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Put,
} from "@nestjs/common";
import { CreateDocumentFiveDto } from "./dto/create-document-five.dto";
import { DocumentFiveService } from "./document-five.service";
import { AuthGuard } from "@nestjs/passport";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { GetUser } from "src/auth/decorator/user.decorator";
import { fte_authority } from "src/authority/authority.entity";

@Controller("document-five")
export class DocumentFiveController {
  constructor(private docFiveService: DocumentFiveService) {}
  @Post()
  createDocumentTypeThree(
    @Body(new ValidationPipe()) createDocumentTypeFive: CreateDocumentFiveDto
  ) {
    return this.docFiveService.createDocument(createDocumentTypeFive);
  }

  @Get("/document/:documentId")
  getDocumentFiveByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docFiveService.getDocumentFiveByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docFiveService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }
}
