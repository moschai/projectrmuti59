import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { DocumentTenService } from './document-ten.service';
import { CreateDocumentTenDto } from './dto/create-document-ten.dto';

@Controller('document-ten')
export class DocumentTenController {
    constructor(
        private docTenService: DocumentTenService
    ) {

    }

    @Post()
    createDocumentTypeTen(
        @Body(new ValidationPipe()) createDocumentTenDto: CreateDocumentTenDto
    ) {
        return this.docTenService.createDocument(createDocumentTenDto);
    }
}
