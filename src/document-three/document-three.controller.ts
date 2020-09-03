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
import { DocumentThreeService } from "./document-three.service";
import { CreateDocumentThreeDto } from "./dto/create-document-three.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator/user.decorator";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { fte_authority } from "src/authority/authority.entity";

@Controller("document-three")
export class DocumentThreeController {
  constructor(private docThreeService: DocumentThreeService) {}
  @Post()
  createDocumentTypeThree(
    @Body(new ValidationPipe()) createDocumentTypeThree: CreateDocumentThreeDto
  ) {
    return this.docThreeService.createDocument(createDocumentTypeThree);
  }

  @Get("/document/:documentId")
  getDocumentThreeByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docThreeService.getDocumentThreeByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docThreeService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }
}
