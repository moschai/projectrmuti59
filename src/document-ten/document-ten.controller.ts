import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  ParseIntPipe,
  Get,
  Param,
  UseGuards,
  Put,
} from "@nestjs/common";
import { DocumentTenService } from "./document-ten.service";
import { CreateDocumentTenDto } from "./dto/create-document-ten.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { GetUser } from "src/auth/decorator/user.decorator";
import { fte_authority } from "src/authority/authority.entity";

@Controller("document-ten")
export class DocumentTenController {
  constructor(private docTenService: DocumentTenService) {}

  @Post()
  createDocumentTypeTen(
    @Body(new ValidationPipe()) createDocumentTenDto: CreateDocumentTenDto
  ) {
    return this.docTenService.createDocument(createDocumentTenDto);
  }

  @Get("/document/:documentId")
  getDocumentTenByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docTenService.getDocumentTenByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docTenService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("authority/table")
  getTablesTenForAuthority(@GetUser() authority: fte_authority) {
    return this.docTenService.getTablesTenForAuthority(authority);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("/table/:tableId")
  getTableTenById(@Param("tableId", new ParseIntPipe()) tableId: number) {
    return this.docTenService.getTableTenById(tableId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/table/approved/:tableId")
  authorityTableTenApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("tableId", new ParseIntPipe()) tableId: number
  ) {
    return this.docTenService.autorityApprovedTableTen(
      authority,
      tableId,
      authorityApprovedDto
    );
  }
}
