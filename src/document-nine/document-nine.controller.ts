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
import { DocumentNineService } from "./document-nine.service";
import { CreateDocumentNineDto } from "./dto/create-document-nine.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator/user.decorator";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";

@Controller("document-nine")
export class DocumentNineController {
  constructor(private docNineService: DocumentNineService) {}
  @Post()
  createDocumentTypeNine(
    @Body(new ValidationPipe()) createDocumentTypeNine: CreateDocumentNineDto
  ) {
    return this.docNineService.createDocument(createDocumentTypeNine);
  }

  @Get("/document/:documentId")
  getDocumentNineByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docNineService.getDocumentNineByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docNineService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("authority/table")
  getTablesNineForAuthority(@GetUser() authority: fte_authority) {
    return this.docNineService.getTablesNineForAuthority(authority);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("/table/:tableId")
  getTableNineById(@Param("tableId", new ParseIntPipe()) tableId: number) {
    return this.docNineService.getTableNineById(tableId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/table/approved/:tableId")
  authorityTableNineApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("tableId", new ParseIntPipe()) tableId: number
  ) {
    return this.docNineService.autorityApprovedTableNine(
      authority,
      tableId,
      authorityApprovedDto
    );
  }
}
