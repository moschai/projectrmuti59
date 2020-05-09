import { fte_document_type_thirteen } from "./document-type-thirteen.entity";
import { EntityRepository, Repository } from "typeorm";
import { fte_signature_thirteen } from "./signature-thirteen.entity";
import { CreateDocumentThirteenDto } from "./dto/create-document-thirteen.dto";

@EntityRepository(fte_document_type_thirteen)
export class DocumentTypeThirteenRepository extends Repository<fte_document_type_thirteen>{
    async createDocumentThirteen(
        createDocumentThirteenDto: CreateDocumentThirteenDto,
        signatureThirteen: fte_signature_thirteen
    ): Promise<fte_document_type_thirteen> {
        const documentthirteen = new fte_document_type_thirteen();
        documentthirteen.certificatesuccess = createDocumentThirteenDto.certificatesuccess;
        documentthirteen.certificateregister = createDocumentThirteenDto.certificateregister;
        documentthirteen.diplomalvone = createDocumentThirteenDto.diplomalvone;
        documentthirteen.diplomalvpwch = createDocumentThirteenDto.diplomalvpwch;
        documentthirteen.diplomalvpwc = createDocumentThirteenDto.diplomalvpwc;
        documentthirteen.diplomaptee = createDocumentThirteenDto.diplomaptee;
        documentthirteen.diplomaptro = createDocumentThirteenDto.diplomaptro;
        documentthirteen.loststudentcard = createDocumentThirteenDto.loststudentcard;
        documentthirteen.damagedstudentcard = createDocumentThirteenDto.damagedstudentcard;
        documentthirteen.samestudentcard = createDocumentThirteenDto.samestudentcard;
        documentthirteen.certificateunit = createDocumentThirteenDto.certificateunit;
        documentthirteen.transcriptlvone = createDocumentThirteenDto.transcriptlvone;
        documentthirteen.transcriptlvtwo = createDocumentThirteenDto.transcriptlvtwo;
        documentthirteen.otherstatus = createDocumentThirteenDto.otherstatus;
        documentthirteen.othermassege = createDocumentThirteenDto.othermassege;
        documentthirteen.thaiversioncs = createDocumentThirteenDto.thaiversioncs;
        documentthirteen.amountthcs = createDocumentThirteenDto.amountthcs;
        documentthirteen.amountengcs = createDocumentThirteenDto.amountengcs;
        documentthirteen.engversioncs = createDocumentThirteenDto.engversioncs;
        documentthirteen.thaiversioncr = createDocumentThirteenDto.thaiversioncr;
        documentthirteen.amountthcr = createDocumentThirteenDto.amountthcr;
        documentthirteen.thaiversiontclvone = createDocumentThirteenDto.thaiversiontclvone;
        documentthirteen.amountthtclvone = createDocumentThirteenDto.amountthtclvone;
        documentthirteen.amountengtclvone = createDocumentThirteenDto.amountengtclvone;
        documentthirteen.engversiontclvone = createDocumentThirteenDto.engversiontclvone;
        documentthirteen.thaiversiontclvtwo = createDocumentThirteenDto.thaiversiontclvtwo;
        documentthirteen.amountthtclvtwo = createDocumentThirteenDto.amountthtclvtwo;
        documentthirteen.amountengtclvtwo = createDocumentThirteenDto.amountengtclvtwo;
        documentthirteen.engversiontclvtwo = createDocumentThirteenDto.engversiontclvtwo;
        documentthirteen.thaiversiondlvone = createDocumentThirteenDto.thaiversiondlvone;
        documentthirteen.amountthdlvone = createDocumentThirteenDto.amountthdlvone;
        documentthirteen.amountengdlvone = createDocumentThirteenDto.amountengdlvone;
        documentthirteen.thaiversiondlvtwo = createDocumentThirteenDto.thaiversiondlvtwo;
        documentthirteen.amountthdlvtwo = createDocumentThirteenDto.amountthdlvtwo;
        documentthirteen.amountengdlvtwo = createDocumentThirteenDto.amountengdlvtwo;
        documentthirteen.engversiondlvtwo = createDocumentThirteenDto.engversiondlvtwo;
        documentthirteen.thaiversioncu = createDocumentThirteenDto.thaiversioncu;
        documentthirteen.amountthcu = createDocumentThirteenDto.amountthcu;
        documentthirteen.thaiversionotms = createDocumentThirteenDto.thaiversionotms;
        documentthirteen.amountthotms = createDocumentThirteenDto.amountthotms;
        documentthirteen.signature = signatureThirteen;

        return await documentthirteen.save();
    }
}