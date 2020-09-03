import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  ParseIntPipe,
  Param,
  Get,
  UseGuards,
  Put,
} from "@nestjs/common";
import { DocumentSixteenService } from "./document-sixteen.service";
import { CreateDocumentSixteenDto } from "./dto/create-document-sixteen.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { fte_authority } from "src/authority/authority.entity";
import { GetUser } from "src/auth/decorator/user.decorator";

@Controller("document-sixteen")
export class DocumentSixteenController {
  constructor(private docSixteenService: DocumentSixteenService) {}
  @Post()
  createDocumentTypeSixteen(
    @Body(new ValidationPipe())
    createDocumentTypeSixteen: CreateDocumentSixteenDto
  ) {
    return this.docSixteenService.createDocument(createDocumentTypeSixteen);
  }

  @Get("/document/:documentId")
  getDocumentSixteenByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docSixteenService.getDocumentSixteenByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docSixteenService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }
}
