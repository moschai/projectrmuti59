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
import { CreateDocumentSeventeenDto } from "./dto/create-document-seventeen.dto";
import { DocumentSeventeenService } from "./document-seventeen.service";
import { AuthGuard } from "@nestjs/passport";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { fte_authority } from "src/authority/authority.entity";
import { GetUser } from "src/auth/decorator/user.decorator";

@Controller("document-seventeen")
export class DocumentSeventeenController {
  constructor(private docSeventeenService: DocumentSeventeenService) {}

  @Post()
  createDocumentTypeSeven(
    @Body(new ValidationPipe())
    createDocumentSeventeenDto: CreateDocumentSeventeenDto
  ) {
    return this.docSeventeenService.createDocument(createDocumentSeventeenDto);
  }

  @Get("/document/:documentId")
  getDocumentSeventeenByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docSeventeenService.getDocumentSeventeenByDocumentId(
      documentId
    );
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docSeventeenService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("authority/table")
  getTablesSeventeenForAuthority(@GetUser() authority: fte_authority) {
    return this.docSeventeenService.getTablesSeventeenForAuthority(authority);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("/table/:tableId")
  getTableSeventeenById(@Param("tableId", new ParseIntPipe()) tableId: number) {
    return this.docSeventeenService.getTableSeventeenById(tableId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/table/approved/:tableId")
  authorityTableSeventeenApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("tableId", new ParseIntPipe()) tableId: number
  ) {
    return this.docSeventeenService.autorityApprovedTableSeventeen(
      authority,
      tableId,
      authorityApprovedDto
    );
  }
}
