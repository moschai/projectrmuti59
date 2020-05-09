import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { DocumentSixteenService } from './document-sixteen.service';
import { CreateDocumentSixteenDto } from './dto/create-document-sixteen.dto';

@Controller('document-sixteen')
export class DocumentSixteenController {
    constructor(private documentSixteenService: DocumentSixteenService) {
    }
    @Post()
    createDocumentTypeSixteen(
        @Body(new ValidationPipe()) createDocumentTypeSixteen: CreateDocumentSixteenDto) {
        return this.documentSixteenService.createDocument(createDocumentTypeSixteen)
    }
}

