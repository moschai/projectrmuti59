import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { DocumentSixService } from './document-six.service';
import { CreateDocumentSixDto } from './dto/create-document-six.dto';

@Controller('document-six')
export class DocumentSixController {
    constructor(
        private docSixService: DocumentSixService
    ) {

    }

    @Post()
    createDocumentTypeSeven(
        @Body(new ValidationPipe()) createDocumentSixDto: CreateDocumentSixDto
    ) {
        return this.docSixService.createDocument(createDocumentSixDto)
    }
}

