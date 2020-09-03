import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  ParseIntPipe,
  Param,
  Get,
  UseGuards,
  Put,
} from "@nestjs/common";
import { CreateDocumentTwoDto } from "./dto/create-document-two.dto";
import { DocumentTwoService } from "./document-two.service";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator/user.decorator";

@Controller("document-two")
export class DocumentTwoController {
  constructor(private docTwoService: DocumentTwoService) {}
  @Post()
  createDocumentTypeTwo(
    @Body(new ValidationPipe()) createDocumentTypeTwoDto: CreateDocumentTwoDto
  ) {
    return this.docTwoService.createDocument(createDocumentTypeTwoDto);
  }

  @Get("/document/:documentId")
  getDocumentTwoByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docTwoService.getDocumentTwoByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docTwoService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }
}
