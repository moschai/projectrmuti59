import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  Param,
  Get,
  ParseIntPipe,
  UseGuards,
  Put,
} from "@nestjs/common";
import { DocumentSixService } from "./document-six.service";
import { CreateDocumentSixDto } from "./dto/create-document-six.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { GetUser } from "src/auth/decorator/user.decorator";
import { fte_authority } from "src/authority/authority.entity";

@Controller("document-six")
export class DocumentSixController {
  constructor(private docSixService: DocumentSixService) {}

  @Post()
  createDocumentTypeSix(
    @Body(new ValidationPipe()) createDocumentSixDto: CreateDocumentSixDto
  ) {
    return this.docSixService.createDocument(createDocumentSixDto);
  }

  @Get("/document/:documentId")
  getDocumentSixByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docSixService.getDocumentSixByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docSixService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("authority/table")
  getTablesSixForAuthority(@GetUser() authority: fte_authority) {
    return this.docSixService.getTablesSixForAuthority(authority);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("/table/:tableId")
  getTableSixById(@Param("tableId", new ParseIntPipe()) tableId: number) {
    return this.docSixService.getTableSixById(tableId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/table/approved/:tableId")
  authorityTableSixApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("tableId", new ParseIntPipe()) tableId: number
  ) {
    return this.docSixService.autorityApprovedTableSix(
      authority,
      tableId,
      authorityApprovedDto
    );
  }
}
