import { Controller, Body, ValidationPipe, Post } from '@nestjs/common';
import { CreateDocumentThirteenDto } from './dto/create-document-thirteen.dto';
import { DocumentThirteenService } from './document-thirteen.service';

@Controller('document-thirteen')
export class DocumentThirteenController {
    constructor(private documentThirteenService: DocumentThirteenService) {
    }
    @Post()
    createDocumentTypeSixteen(
        @Body(new ValidationPipe()) createDocumentTypeThirteen: CreateDocumentThirteenDto) {
        return this.documentThirteenService.createDocument(createDocumentTypeThirteen);
    }
}
