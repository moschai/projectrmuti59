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
import { DocumentSevenService } from "./document-seven.service";
import { CreateDocumentSevenDto } from "./dto/create-document-seven.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";
import { fte_authority } from "src/authority/authority.entity";
import { GetUser } from "src/auth/decorator/user.decorator";

@Controller("document-seven")
export class DocumentSevenController {
  constructor(private docSevenService: DocumentSevenService) {}

  @Post()
  createDocumentTypeSeven(
    @Body(new ValidationPipe()) createDocumentSevenDto: CreateDocumentSevenDto
  ) {
    return this.docSevenService.createDocument(createDocumentSevenDto);
  }

  @Get("/document/:documentId")
  getDocumentSevenByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docSevenService.getDocumentSevenByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docSevenService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("authority/table")
  getTablesSevenForAuthority(@GetUser() authority: fte_authority) {
    return this.docSevenService.getTablesSevenForAuthority(authority);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("/table/:tableId")
  getTableSevenById(@Param("tableId", new ParseIntPipe()) tableId: number) {
    return this.docSevenService.getTableSevenById(tableId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/table/approved/:tableId")
  authorityTableSevenApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("tableId", new ParseIntPipe()) tableId: number
  ) {
    return this.docSevenService.autorityApprovedTableSeven(
      authority,
      tableId,
      authorityApprovedDto
    );
  }
}
