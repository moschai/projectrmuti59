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
import { DocumentFourteenService } from "./document-fourteen.service";
import { CreateDocumentFourteenDto } from "./dto/create-document-fourteen.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator/user.decorator";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";

@Controller("document-fourteen")
export class DocumentFourteenController {
  constructor(private docFourteenService: DocumentFourteenService) {}
  @Post()
  createDocumentTypeTwelve(
    @Body(new ValidationPipe())
    createDocumentTypeFourteen: CreateDocumentFourteenDto
  ) {
    return this.docFourteenService.createDocument(createDocumentTypeFourteen);
  }

  @Get("/document/:documentId")
  getDocumentFourteenByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docFourteenService.getDocumentFourteenByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docFourteenService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }
}
