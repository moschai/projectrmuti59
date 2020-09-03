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
import { DocumentTwelveService } from "./document-twelve.service";
import { CreateDocumentTwelveDto } from "./dto/create-document-twelve.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { GetUser } from "src/auth/decorator/user.decorator";
import { fte_authority } from "src/authority/authority.entity";

@Controller("document-twelve")
export class DocumentTwelveController {
  constructor(private docTwelveService: DocumentTwelveService) {}
  @Post()
  createDocumentTypeTwelve(
    @Body(new ValidationPipe())
    createDocumentTypeTwelve: CreateDocumentTwelveDto
  ) {
    return this.docTwelveService.createDocument(createDocumentTypeTwelve);
  }

  @Get("/document/:documentId")
  getDocumentTwelveByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docTwelveService.getDocumentTwelveByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docTwelveService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }
}
