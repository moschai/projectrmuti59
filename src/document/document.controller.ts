import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
    constructor(
        private documentService: DocumentService
    ) {

    }

    @Get()
    getDocumentAll() {
        return this.documentService.getDocumentAll();
    }

    @Get('/:id')
    getDocumentById(@Param('id') id) {
        return this.documentService.getDocumentById(id);
    }

    @Patch('/status')
    updateDocumentStatus(
        @Body() updateDocumentStatusDto
    ) {
        return this.documentService.updateDocumentStatus(updateDocumentStatusDto);
    }

    @Delete('/:id')
    deleteDocumentById(@Param('id') id) {
        return this.documentService.deleteDocumentById(id);
    }

}
