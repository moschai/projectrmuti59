import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { DocumentFifteenService } from './document-fifteen.service';
import { CreateDocumentFifteenDto } from './dto/create-document-fifteen.dto';

@Controller('document-fifteen')
export class DocumentFifteenController {
    constructor(private documentFifteenService: DocumentFifteenService) {
    }
    @Post()
    createDocumentTypeTwelve(
        @Body(new ValidationPipe()) createDocumentTypeFifteen: CreateDocumentFifteenDto) {
        return this.documentFifteenService.createDocument(createDocumentTypeFifteen)
    }
}
