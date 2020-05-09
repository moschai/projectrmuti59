import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateDocumentTwoDto } from './dto/create-document-two.dto';
import { DocumentTwoService } from './document-two.service';

@Controller('document-two')
export class DocumentTwoController {
    constructor(private documentTwoService: DocumentTwoService) {

    }
    @Post()
    createDocumentTypeTwo(
        @Body(new ValidationPipe()) createDocumentTypeTwoDto: CreateDocumentTwoDto
    ) {
        return this.documentTwoService.createDocument(createDocumentTypeTwoDto)
    }
}
