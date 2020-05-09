import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { DocumentTwelveService } from './document-twelve.service';
import { CreateDocumentTwelveDto } from './dto/create-document-twelve.dto';

@Controller('document-twelve')
export class DocumentTwelveController {
    constructor(private documentTwelveService: DocumentTwelveService) {
    }
    @Post()
    createDocumentTypeTwelve(
        @Body(new ValidationPipe()) createDocumentTypeTwelve: CreateDocumentTwelveDto) {
        return this.documentTwelveService.createDocument(createDocumentTypeTwelve)
    }
}
