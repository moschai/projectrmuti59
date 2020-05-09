import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { DocumentElevenService } from './document-eleven.service';
import { CreateDocumentElevenDto } from './dto/create-document-eleven.dto';

@Controller('document-eleven')
export class DocumentElevenController {
    constructor(private documentElevenService: DocumentElevenService) {
    }
    @Post()
    createDocumentTypeEleven(
        @Body(new ValidationPipe()) createDocumentTypeEleven: CreateDocumentElevenDto) {
        return this.documentElevenService.createDocument(createDocumentTypeEleven)
    }
}
