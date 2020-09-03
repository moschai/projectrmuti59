import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Patch,
  Get,
  Query,
  Param,
  ParseIntPipe,
  UseGuards,
  Put,
} from "@nestjs/common";
import { DocumentOneService } from "./document-one.service";
import { CreateDocumentOneDto } from "./dto/create-document-one.dto";
import { AuthorityApprovedDto } from "./dto/authority-approved.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator/user.decorator";
import { fte_authority } from "src/authority/authority.entity";

@Controller("document-one")
export class DocumentOneController {
  constructor(private docOneService: DocumentOneService) {}

  @Post()
  createDocumentTypeOne(
    @Body(new ValidationPipe()) createDocumentOneDto: CreateDocumentOneDto
  ) {
    return this.docOneService.createDocument(createDocumentOneDto);
  }

  //document-one/document/123123
  @Get("/document/:documentId")
  getDocumentOneByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docOneService.getDocumentOneByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docOneService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }
}
