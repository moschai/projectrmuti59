import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  Param,
  ParseIntPipe,
  Get,
  UseGuards,
  Put,
} from "@nestjs/common";
import { DocumentFifteenService } from "./document-fifteen.service";
import { CreateDocumentFifteenDto } from "./dto/create-document-fifteen.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { GetUser } from "src/auth/decorator/user.decorator";
import { fte_authority } from "src/authority/authority.entity";

@Controller("document-fifteen")
export class DocumentFifteenController {
  constructor(private docFifteenService: DocumentFifteenService) {}
  @Post()
  createDocumentTypeTwelve(
    @Body(new ValidationPipe())
    createDocumentTypeFifteen: CreateDocumentFifteenDto
  ) {
    return this.docFifteenService.createDocument(createDocumentTypeFifteen);
  }

  @Get("/document/:documentId")
  getDocumentFifteenByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docFifteenService.getDocumentFifteenByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docFifteenService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }
}
