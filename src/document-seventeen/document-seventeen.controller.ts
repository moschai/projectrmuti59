import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateDocumentSeventeenDto } from './dto/create-document-seventeen.dto';
import { DocumentSeventeenService } from './document-seventeen.service';

@Controller('document-seventeen')
export class DocumentSeventeenController {
    constructor(
        private docSeventeenService: DocumentSeventeenService
    ) {

    }

    @Post()
    createDocumentTypeSeven(
        @Body(new ValidationPipe()) createDocumentSeventeenDto: CreateDocumentSeventeenDto
    ) {
        return this.docSeventeenService.createDocument(createDocumentSeventeenDto);
    }
}
