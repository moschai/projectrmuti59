import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { DocumentFourteenService } from './document-fourteen.service';
import { CreateDocumentFourteenDto } from './dto/create-document-fourteen.dto';

@Controller('document-fourteen')
export class DocumentFourteenController {
    constructor(private documentFourteenService: DocumentFourteenService) {
    }
    @Post()
    createDocumentTypeTwelve(
        @Body(new ValidationPipe()) createDocumentTypeFourteen: CreateDocumentFourteenDto) {
        return this.documentFourteenService.createDocument(createDocumentTypeFourteen)
    }
}
