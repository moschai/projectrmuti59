import { fte_document_type_thirteen } from "./document-type-thirteen.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateDocumentThirteenDto } from "./dto/create-document-thirteen.dto";

@EntityRepository(fte_document_type_thirteen)
export class DocumentTypeThirteenRepository extends Repository<
  fte_document_type_thirteen
> {
  async createDocumentThirteen(
    createDocumentThirteenDto: CreateDocumentThirteenDto
  ): Promise<fte_document_type_thirteen> {
    const documentthirteen = new fte_document_type_thirteen();
    documentthirteen.certificatestudy =
      createDocumentThirteenDto.certificatestudy;
    documentthirteen.cerstudythaiversion =
      createDocumentThirteenDto.cerstudythaiversion;
    documentthirteen.cerstudyengversion =
      createDocumentThirteenDto.cerstudyengversion;
    documentthirteen.cerstudyunitthai =
      createDocumentThirteenDto.cerstudyunitthai;
    documentthirteen.cerstudyuniteng =
      createDocumentThirteenDto.cerstudyuniteng;
    documentthirteen.certificatesuccess = documentthirteen.cersuccessthaiversion =
      createDocumentThirteenDto.cersuccessthaiversion;
    documentthirteen.cersuccessunitthai =
      createDocumentThirteenDto.cersuccessunitthai;
    createDocumentThirteenDto.certificatesuccess;
    documentthirteen.certificateregister =
      createDocumentThirteenDto.certificateregister;
    documentthirteen.cerregisterthaiversion =
      createDocumentThirteenDto.cerregisterthaiversion;
    documentthirteen.cerregisterunitthai =
      createDocumentThirteenDto.cerregisterunitthai;
    documentthirteen.transcripstudy = createDocumentThirteenDto.transcripstudy;
    documentthirteen.transcripthaiversion =
      createDocumentThirteenDto.transcripthaiversion;
    documentthirteen.transcripunitthai =
      createDocumentThirteenDto.transcripunitthai;
    documentthirteen.transcripengversion =
      createDocumentThirteenDto.transcripengversion;
    documentthirteen.transcripuniteng =
      createDocumentThirteenDto.transcripuniteng;
    documentthirteen.transcripsuccess =
      createDocumentThirteenDto.transcripsuccess;
    documentthirteen.tcsuccessthaiversion =
      createDocumentThirteenDto.tcsuccessthaiversion;
    documentthirteen.tcsuccessengversion =
      createDocumentThirteenDto.tcsuccessengversion;
    documentthirteen.tcsuccessunitthai =
      createDocumentThirteenDto.tcsuccessunitthai;
    documentthirteen.tcsuccessuniteng =
      createDocumentThirteenDto.tcsuccessuniteng;
    documentthirteen.dimplomalvone = createDocumentThirteenDto.dimplomalvone;
    documentthirteen.dpmlvonethaiversion =
      createDocumentThirteenDto.dpmlvonethaiversion;
    documentthirteen.dpmlvoneunitthai =
      createDocumentThirteenDto.dpmlvoneunitthai;
    documentthirteen.dpmlvoneengversion =
      createDocumentThirteenDto.dpmlvoneengversion;
    documentthirteen.dpmlvoneuniteng =
      createDocumentThirteenDto.dpmlvoneuniteng;
    documentthirteen.dimplomalvtwo = createDocumentThirteenDto.dimplomalvtwo;
    documentthirteen.dpmlvtwothaiversion =
      createDocumentThirteenDto.dpmlvtwothaiversion;
    documentthirteen.dpmlvtwounitthai =
      createDocumentThirteenDto.dpmlvtwounitthai;
    documentthirteen.dpmlvtwoengversion =
      createDocumentThirteenDto.dpmlvtwoengversion;
    documentthirteen.dpmlvtwouniteng =
      createDocumentThirteenDto.dpmlvtwouniteng;
    documentthirteen.dimplomalvthree =
      createDocumentThirteenDto.dimplomalvthree;
    documentthirteen.dpmlvthreethaiversion =
      createDocumentThirteenDto.dpmlvthreethaiversion;
    documentthirteen.dpmlvthreeunitthai =
      createDocumentThirteenDto.dpmlvthreeunitthai;
    documentthirteen.dpmlvthreeengversion =
      createDocumentThirteenDto.dpmlvthreeengversion;
    documentthirteen.dpmlvthreeuniteng =
      createDocumentThirteenDto.dpmlvthreeuniteng;
    documentthirteen.dimplomalvfour = createDocumentThirteenDto.dimplomalvfour;
    documentthirteen.dpmlvfourthaiversion =
      createDocumentThirteenDto.dpmlvfourthaiversion;
    documentthirteen.dpmlvfourunitthai =
      createDocumentThirteenDto.dpmlvfourunitthai;
    documentthirteen.dpmlvfourengversion =
      createDocumentThirteenDto.dpmlvfourengversion;
    documentthirteen.dpmlvfouruniteng =
      createDocumentThirteenDto.dpmlvfouruniteng;
    documentthirteen.loststudentcard =
      createDocumentThirteenDto.loststudentcard;
    documentthirteen.certificateunit =
      createDocumentThirteenDto.certificateunit;
    documentthirteen.ctfcthaiversion =
      createDocumentThirteenDto.ctfcthaiversion;
    documentthirteen.ctfcunitthai = createDocumentThirteenDto.ctfcunitthai;
    documentthirteen.otherdocument = createDocumentThirteenDto.otherdocument;
    documentthirteen.othermassege = createDocumentThirteenDto.othermassege;
    documentthirteen.otherdocthaiversion =
      createDocumentThirteenDto.otherdocthaiversion;
    documentthirteen.otherdocunitthai =
      createDocumentThirteenDto.otherdocunitthai;
    documentthirteen.signature_std = createDocumentThirteenDto.signature_std;

    return await documentthirteen.save();
  }
}
