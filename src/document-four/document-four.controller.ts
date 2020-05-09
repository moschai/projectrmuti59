import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { DocumentFourService } from './document-four.service';
import { CreateDocumentFourDto } from './dto/create-document-four.dto';

@Controller('document-four')
export class DocumentFourController {
    constructor(private documentFourService: DocumentFourService) {
    }
    @Post()
    createDocumentTypeFour(
        @Body(new ValidationPipe()) createDocumentTypeFour: CreateDocumentFourDto) {
        return this.documentFourService.createDocument(createDocumentTypeFour)
    }
}

