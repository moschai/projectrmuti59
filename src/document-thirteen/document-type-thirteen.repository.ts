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

    documentthirteen.nameeng = createDocumentThirteenDto.nameeng;
    documentthirteen.surnameeng = createDocumentThirteenDto.surnameeng;
    documentthirteen.currentaddress = createDocumentThirteenDto.currentaddress;
    documentthirteen.daystudy = createDocumentThirteenDto.daystudy;
    documentthirteen.daysuccessstudy =
      createDocumentThirteenDto.daysuccessstudy;

    documentthirteen.certificateTsc = createDocumentThirteenDto.certificateTsc;
    documentthirteen.cerTscthaiversion =
      createDocumentThirteenDto.cerTscthaiversion;
    documentthirteen.cerTscengversion =
      createDocumentThirteenDto.cerTscengversion;
    documentthirteen.cerTscunitthai = createDocumentThirteenDto.cerTscunitthai;
    documentthirteen.cerTscuniteng = createDocumentThirteenDto.cerTscuniteng;

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
    documentthirteen.cersuccessengversion =
      createDocumentThirteenDto.cersuccessengversion;
    documentthirteen.cersuccessuniteng =
      createDocumentThirteenDto.cersuccessuniteng;

    documentthirteen.certificateregister =
      createDocumentThirteenDto.certificateregister;
    documentthirteen.cerregisterthaiversion =
      createDocumentThirteenDto.cerregisterthaiversion;
    documentthirteen.cerregisterunitthai =
      createDocumentThirteenDto.cerregisterunitthai;
    documentthirteen.cerregisterengversion =
      createDocumentThirteenDto.cerregisterengversion;
    documentthirteen.cerregisteruniteng =
      createDocumentThirteenDto.cerregisteruniteng;

    documentthirteen.certificatestdcard =
      createDocumentThirteenDto.certificatestdcard;
    documentthirteen.cerstdcardthaiversion =
      createDocumentThirteenDto.cerstdcardthaiversion;
    documentthirteen.cerstdcardengversion =
      createDocumentThirteenDto.cerstdcardengversion;
    documentthirteen.cerstdcardunitthai =
      createDocumentThirteenDto.cerstdcardunitthai;
    documentthirteen.cerstdcarduniteng =
      createDocumentThirteenDto.cerstdcarduniteng;

    documentthirteen.otherstudy = createDocumentThirteenDto.otherstudy;
    documentthirteen.otherstudythaiversion =
      createDocumentThirteenDto.otherstudythaiversion;
    documentthirteen.otherstudyengversion =
      createDocumentThirteenDto.otherstudyengversion;
    documentthirteen.otherstudyunitthai =
      createDocumentThirteenDto.otherstudyunitthai;
    documentthirteen.otherstudyuniteng =
      createDocumentThirteenDto.otherstudyuniteng;

    documentthirteen.boardcerapprove =
      createDocumentThirteenDto.boardcerapprove;
    documentthirteen.boardcerapprovethaiversion =
      createDocumentThirteenDto.boardcerapprovethaiversion;
    documentthirteen.boardcerapproveengversion =
      createDocumentThirteenDto.boardcerapproveengversion;
    documentthirteen.boardcerapproveunitthai =
      createDocumentThirteenDto.boardcerapproveunitthai;
    documentthirteen.boardcerapproveuniteng =
      createDocumentThirteenDto.boardcerapproveuniteng;
    documentthirteen.otherstudymessage =
      createDocumentThirteenDto.otherstudymessage;
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

    documentthirteen.cersuccessstudy =
      createDocumentThirteenDto.cersuccessstudy;
    documentthirteen.cersuccessstudythaiversion =
      createDocumentThirteenDto.cersuccessstudythaiversion;
    documentthirteen.cersuccessstudyengversion =
      createDocumentThirteenDto.cersuccessstudyengversion;
    documentthirteen.cersuccessstudyunitthai =
      createDocumentThirteenDto.cersuccessstudyunitthai;
    documentthirteen.cersuccessuniteng =
      createDocumentThirteenDto.cersuccessuniteng;

    documentthirteen.substitudedimploma =
      createDocumentThirteenDto.substitudedimploma;
    documentthirteen.substitudedimplomathaiversion =
      createDocumentThirteenDto.substitudedimplomathaiversion;
    documentthirteen.substitudedimplomaunitthai =
      createDocumentThirteenDto.substitudedimplomaunitthai;

    documentthirteen.substitudedegree =
      createDocumentThirteenDto.substitudedegree;
    documentthirteen.substitudedegreethaiversion =
      createDocumentThirteenDto.substitudedegreethaiversion;
    documentthirteen.substitudedegreeunitthai =
      createDocumentThirteenDto.substitudedegreeunitthai;

    documentthirteen.Translationdimploma =
      createDocumentThirteenDto.Translationdimploma;
    documentthirteen.Translationdimplomaengversion =
      createDocumentThirteenDto.Translationdimplomaengversion;
    documentthirteen.Translationdimplomauniteng =
      createDocumentThirteenDto.Translationdimplomauniteng;

    documentthirteen.Translationdegree =
      createDocumentThirteenDto.Translationdegree;
    documentthirteen.Translationdegreeengversion =
      createDocumentThirteenDto.Translationdegreeengversion;
    documentthirteen.Translationdegreeuniteng =
      createDocumentThirteenDto.Translationdegreeuniteng;

    documentthirteen.othersuccessstudy =
      createDocumentThirteenDto.othersuccessstudy;
    documentthirteen.othersuccessstudythaiversion =
      createDocumentThirteenDto.othersuccessstudythaiversion;
    documentthirteen.othersuccessstudyengversion =
      createDocumentThirteenDto.othersuccessstudyengversion;
    createDocumentThirteenDto.othersuccessstudyunitthai =
      createDocumentThirteenDto.othersuccessstudyunitthai;
    documentthirteen.othersuccessstudyuniteng =
      createDocumentThirteenDto.othersuccessstudyuniteng;
    documentthirteen.othersuccessstudymessage =
      createDocumentThirteenDto.othersuccessstudymessage;

    documentthirteen.signature_std = createDocumentThirteenDto.signature_std;

    return await documentthirteen.save();
  }
}
