import { Controller, Post, Body, ValidationPipe, Patch } from '@nestjs/common';
import { DocumentOneService } from './document-one.service';
import { CreateDocumentOneDto } from './dto/create-document-one.dto';

@Controller('document-one')
export class DocumentOneController {
    constructor(
        private docOneService: DocumentOneService
    ) {

    }

    @Post()
    createDocumentTypeOne(
        @Body(new ValidationPipe()) createDocumentOneDto: CreateDocumentOneDto
    ) {
        return this.docOneService.createDocument(createDocumentOneDto);
    }


}
