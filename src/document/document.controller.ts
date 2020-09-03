import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { DocumentService } from "./document.service";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorator/user.decorator";
import { fte_authority } from "src/authority/authority.entity";
import { fte_admin } from "src/admin/admin.entity";

@Controller("document")
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get("/for-authority")
  @UseGuards(AuthGuard("jwt-authority"))
  getDocumentsForAuthority(@GetUser() authority: fte_authority) {
    return this.documentService.getDocumentForAuthority(authority);
  }

  @Get("/for-admin")
  @UseGuards(AuthGuard("jwt-admin"))
  getDocumentsForAdmin(@GetUser() admin: fte_admin) {
    return this.documentService.getDocumentForAdmin(admin);
  }

  @Get()
  getDocumentAll() {
    return this.documentService.getDocumentAll();
  }

  @Get("/:id")
  getDocumentById(@Param("id") id) {
    return this.documentService.getDocumentById(id);
  }

  @Patch("/status")
  updateDocumentStatus(@Body() updateDocumentStatusDto) {
    return this.documentService.updateDocumentStatus(updateDocumentStatusDto);
  }

  @UseGuards(AuthGuard("jwt-admin"))
  @Delete("/:id")
  deleteDocumentById(@Param("id") id) {
    return this.documentService.deleteDocumentById(id);
  }

  @Get("tag/:documentId")
  getDocumentByStudent(
    @Param("documentId", ParseIntPipe) documentId: number,
    @Query("studentId") studentId: string
  ) {
    return this.documentService.getDocumentByStudent(documentId, studentId);
  }
}
