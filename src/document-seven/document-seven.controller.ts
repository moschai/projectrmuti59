import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { DocumentSevenService } from './document-seven.service';
import { CreateDocumentSevenDto } from './dto/create-document-seven.dto';

@Controller('document-seven')
export class DocumentSevenController {
    constructor(
        private docSevenService: DocumentSevenService
    ) {

    }

    @Post()
    createDocumentTypeSeven(
        @Body(new ValidationPipe()) createDocumentSevenDto: CreateDocumentSevenDto
    ) {
        return this.docSevenService.createDocument(createDocumentSevenDto);
    }
}
