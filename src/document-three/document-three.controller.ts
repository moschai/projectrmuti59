import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";
import { DocumentThreeService } from "./document-three.service";
import { CreateDocumentThreeDto } from "./dto/create-document-three.dto";


@Controller('document-three')
export class DocumentThreeController {
    constructor(private documentThreeService: DocumentThreeService) {
    }
    @Post()
    createDocumentTypeThree(
        @Body(new ValidationPipe()) createDocumentTypeThree: CreateDocumentThreeDto) {
        return this.documentThreeService.createDocument(createDocumentTypeThree)
    }
}

