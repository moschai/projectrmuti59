import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { DocumentNineService } from './document-nine.service';
import { CreateDocumentNineDto } from './dto/create-document-nine.dto';

@Controller('document-nine')
export class DocumentNineController {
    constructor(private documentNineService: DocumentNineService) {
    }
    @Post()
    createDocumentTypeNine(
        @Body(new ValidationPipe()) createDocumentTypeNine: CreateDocumentNineDto) {
        return this.documentNineService.createDocument(createDocumentTypeNine)
    }
}
