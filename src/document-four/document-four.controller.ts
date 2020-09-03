import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Put,
} from "@nestjs/common";
import { DocumentFourService } from "./document-four.service";
import { CreateDocumentFourDto } from "./dto/create-document-four.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { GetUser } from "src/auth/decorator/user.decorator";
import { fte_authority } from "src/authority/authority.entity";

@Controller("document-four")
export class DocumentFourController {
  constructor(private docFourService: DocumentFourService) {}
  @Post()
  createDocumentTypeFour(
    @Body(new ValidationPipe()) createDocumentTypeFour: CreateDocumentFourDto
  ) {
    return this.docFourService.createDocument(createDocumentTypeFour);
  }

  @Get("/document/:documentId")
  getDocumentFourByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docFourService.getDocumentFourByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docFourService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }
}
