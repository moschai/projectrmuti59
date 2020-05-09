import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateDocumentFiveDto } from './dto/create-document-five.dto';
import { DocumentFiveService } from './document-five.service';

@Controller('document-five')
export class DocumentFiveController {
    constructor(private documentFiveService: DocumentFiveService) {
    }
    @Post()
    createDocumentTypeThree(
        @Body(new ValidationPipe()) createDocumentTypeFive: CreateDocumentFiveDto) {
        return this.documentFiveService.createDocument(createDocumentTypeFive)
    }
}

