import { Controller, ValidationPipe, Body, Post } from '@nestjs/common';
import { DocumentEightService } from './document-eight.service';
import { CreateDocumentEightDto } from './dto/create-document-eight.dto';

@Controller('document-eight')
export class DocumentEightController {
    constructor(
        private docEightService: DocumentEightService
    ) {

    }

    @Post()
    createDocumentTypeEight(
        @Body(new ValidationPipe()) createDocumentEightDto: CreateDocumentEightDto
    ) {
        return this.docEightService.createDocument(createDocumentEightDto)
    }
}

