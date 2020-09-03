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
import { DocumentElevenService } from "./document-eleven.service";
import { CreateDocumentElevenDto } from "./dto/create-document-eleven.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator/user.decorator";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { fte_authority } from "src/authority/authority.entity";

@Controller("document-eleven")
export class DocumentElevenController {
  constructor(private docElevenService: DocumentElevenService) {}
  @Post()
  createDocumentTypeEleven(
    @Body(new ValidationPipe())
    createDocumentTypeEleven: CreateDocumentElevenDto
  ) {
    return this.docElevenService.createDocument(createDocumentTypeEleven);
  }

  @Get("/document/:documentId")
  getDocumentElevenByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docElevenService.getDocumentElevenByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docElevenService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }
}
