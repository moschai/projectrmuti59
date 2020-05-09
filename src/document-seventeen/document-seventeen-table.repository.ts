import { EntityRepository, Repository } from "typeorm";
import { fte_document_type_seventeen_table } from "./document-type-seventeen-table.entity";
import { CreateDocumentSeventeenDto } from "./dto/create-document-seventeen.dto";
import { fte_document_type_seventeen } from "./document-type-seventeen.entity";

@EntityRepository(fte_document_type_seventeen_table)
export class DocuemntSeventeenTableRepository extends Repository<fte_document_type_seventeen_table>{


    async createTableSeventeen(
        createDocumentSeventeenDto: CreateDocumentSeventeenDto,
        documentTypeSeventeen: fte_document_type_seventeen

    ) {

        const tables = [];
        createDocumentSeventeenDto.tables.forEach(table => {
            tables.push({ ...table, type: documentTypeSeventeen })
        })

        return await this.createQueryBuilder()
            .insert()
            .into(fte_document_type_seventeen_table)
            .values(tables)
            .execute()

    }
}
