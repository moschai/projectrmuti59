import {
  Controller,
  Body,
  ValidationPipe,
  Post,
  Param,
  ParseIntPipe,
  Get,
} from "@nestjs/common";
import { CreateDocumentThirteenDto } from "./dto/create-document-thirteen.dto";
import { DocumentThirteenService } from "./document-thirteen.service";

@Controller("document-thirteen")
export class DocumentThirteenController {
  constructor(private docThirteenService: DocumentThirteenService) {}
  @Post()
  createDocumentTypeSixteen(
    @Body(new ValidationPipe())
    createDocumentTypeThirteen: CreateDocumentThirteenDto
  ) {
    return this.docThirteenService.createDocument(createDocumentTypeThirteen);
  }

  @Get("/document/:documentId")
  getDocumentThirteenByDocumentId(
    @Param("documentId", new ParseIntPipe()) documentId: number
  ) {
    return this.docThirteenService.getDocumentThirteenByDocumentId(documentId);
  }
}
