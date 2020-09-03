import {
  Controller,
  ValidationPipe,
  Body,
  Post,
  Param,
  Get,
  ParseIntPipe,
  UseGuards,
  Put,
} from "@nestjs/common";
import { DocumentEightService } from "./document-eight.service";
import { CreateDocumentEightDto } from "./dto/create-document-eight.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator/user.decorator";
import { fte_authority } from "src/authority/authority.entity";
import { AuthorityApprovedDto } from "src/document-one/dto/authority-approved.dto";

@Controller("document-eight")
export class DocumentEightController {
  constructor(private docEightService: DocumentEightService) {}

  @Post()
  createDocumentTypeEight(
    @Body(new ValidationPipe()) createDocumentEightDto: CreateDocumentEightDto
  ) {
    return this.docEightService.createDocument(createDocumentEightDto);
  }

  @Get("/document/:documentId")
  getDocumentEightByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docEightService.getDocumentEightByDocumentId(documentId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/approved/:documentId")
  authorityApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docEightService.authorityApproved(
      documentId,
      authority,
      authorityApprovedDto
    );
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("authority/table")
  getTablesEightForAuthority(@GetUser() authority: fte_authority) {
    return this.docEightService.getTablesEightForAuthority(authority);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Get("/table/:tableId")
  getTableEightById(@Param("tableId", new ParseIntPipe()) tableId: number) {
    return this.docEightService.getTableEightById(tableId);
  }

  @UseGuards(AuthGuard("jwt-authority"))
  @Put("authority/table/approved/:tableId")
  authorityTableEightApproved(
    @Body(new ValidationPipe()) authorityApprovedDto: AuthorityApprovedDto,
    @GetUser() authority: fte_authority,
    @Param("tableId", new ParseIntPipe()) tableId: number
  ) {
    return this.docEightService.autorityApprovedTableEight(
      authority,
      tableId,
      authorityApprovedDto
    );
  }
}
