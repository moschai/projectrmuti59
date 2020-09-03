import {
  IsNumber,
  IsString,
  MaxLength,
  Length,
  IsInt,
  IsOptional,
  IsBoolean,
  IsNumberString,
  MinLength,
} from "class-validator";
import { LevelEducation } from "src/document/enum/level-education.enum";
import { isNumber } from "util";

export class CreateDocumentThirteenDto {
  @IsString()
  @MaxLength(255)
  nameeng: string;

  @IsString()
  @MaxLength(255)
  surnameeng: string;

  @IsString()
  @MaxLength(255)
  currentaddress: string;

  @IsString()
  @MaxLength(255)
  daystudy: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  daysuccessstudy: string;

  @IsBoolean()
  @IsOptional()
  certificateTsc: boolean;

  @IsBoolean()
  @IsOptional()
  cerTscthaiversion: boolean;

  @IsBoolean()
  @IsOptional()
  cerTscengversion: boolean;

  @IsNumber()
  @IsOptional()
  cerTscunitthai: number;

  @IsNumber()
  @IsOptional()
  cerTscuniteng: number;

  @IsBoolean()
  @IsOptional()
  certificatestudy: boolean;

  @IsBoolean()
  @IsOptional()
  cerstudythaiversion: boolean;

  @IsBoolean()
  @IsOptional()
  cerstudyengversion: boolean;

  @IsNumber()
  @IsOptional()
  cerstudyunitthai: number;

  @IsNumber()
  @IsOptional()
  cerstudyuniteng: number;

  @IsBoolean()
  @IsOptional()
  certificatesuccess: boolean;

  @IsBoolean()
  @IsOptional()
  cersuccessthaiversion: boolean;

  @IsBoolean()
  @IsOptional()
  cersuccessengversion: boolean;

  @IsNumber()
  @IsOptional()
  cersuccessunitthai: number;

  @IsNumber()
  @IsOptional()
  cersuccessuniteng: number;

  @IsBoolean()
  @IsOptional()
  certificateregister: boolean;

  @IsBoolean()
  @IsOptional()
  cerregisterthaiversion: boolean;

  @IsBoolean()
  @IsOptional()
  cerregisterengversion: boolean;

  @IsNumber()
  @IsOptional()
  cerregisterunitthai: number;

  @IsNumber()
  @IsOptional()
  cerregisteruniteng: number;

  @IsBoolean()
  @IsOptional()
  certificatestdcard: boolean;

  @IsBoolean()
  @IsOptional()
  cerstdcardthaiversion: boolean;

  @IsNumber()
  @IsOptional()
  cerstdcardunitthai: number;

  @IsBoolean()
  @IsOptional()
  cerstdcardengversion: boolean;

  @IsNumber()
  @IsOptional()
  cerstdcarduniteng: number;

  @IsBoolean()
  @IsOptional()
  otherstudy: boolean;

  @IsBoolean()
  @IsOptional()
  otherstudythaiversion: boolean;

  @IsNumber()
  @IsOptional()
  otherstudyunitthai: number;

  @IsBoolean()
  @IsOptional()
  otherstudyengversion: boolean;

  @IsNumber()
  @IsOptional()
  otherstudyuniteng: number;

  @IsString()
  @MaxLength(255)
  otherstudymessage: string;

  @IsBoolean()
  @IsOptional()
  transcripsuccess: boolean;

  @IsBoolean()
  @IsOptional()
  tcsuccessthaiversion: boolean;

  @IsNumber()
  @IsOptional()
  tcsuccessunitthai: number;

  @IsBoolean()
  @IsOptional()
  tcsuccessengversion: boolean;

  @IsNumber()
  @IsOptional()
  tcsuccessuniteng: number;

  @IsBoolean()
  @IsOptional()
  boardcerapprove: boolean;

  @IsBoolean()
  @IsOptional()
  boardcerapprovethaiversion: boolean;

  @IsNumber()
  @IsOptional()
  boardcerapproveunitthai: number;

  @IsBoolean()
  @IsOptional()
  boardcerapproveengversion: boolean;

  @IsNumber()
  @IsOptional()
  boardcerapproveuniteng: number;

  @IsBoolean()
  @IsOptional()
  cersuccessstudy: boolean;

  @IsBoolean()
  @IsOptional()
  cersuccessstudythaiversion: boolean;

  @IsNumber()
  @IsOptional()
  cersuccessstudyunitthai: number;

  @IsBoolean()
  @IsOptional()
  cersuccessstudyengversion: boolean;

  @IsNumber()
  @IsOptional()
  cersuccessstudyuniteng: number;

  @IsBoolean()
  @IsOptional()
  substitudedimploma: boolean;

  @IsBoolean()
  @IsOptional()
  substitudedimplomathaiversion: boolean;

  @IsNumber()
  @IsOptional()
  substitudedimplomaunitthai: number;

  @IsBoolean()
  @IsOptional()
  substitudedegree: boolean;

  @IsBoolean()
  @IsOptional()
  substitudedegreethaiversion: boolean;

  @IsNumber()
  @IsOptional()
  substitudedegreeunitthai: number;

  @IsBoolean()
  @IsOptional()
  Translationdimploma: boolean;

  @IsBoolean()
  @IsOptional()
  Translationdimplomaengversion: boolean;

  @IsNumber()
  @IsOptional()
  Translationdimplomauniteng: number;

  @IsBoolean()
  @IsOptional()
  Translationdegree: boolean;

  @IsBoolean()
  @IsOptional()
  Translationdegreeengversion: boolean;

  @IsNumber()
  @IsOptional()
  Translationdegreeuniteng: number;

  @IsBoolean()
  @IsOptional()
  othersuccessstudy: boolean;

  @IsBoolean()
  @IsOptional()
  othersuccessstudythaiversion: boolean;

  @IsNumber()
  @IsOptional()
  othersuccessstudyunitthai: number;

  @IsBoolean()
  @IsOptional()
  othersuccessstudyengversion: boolean;

  @IsNumber()
  @IsOptional()
  othersuccessstudyuniteng: number;

  @IsString()
  @MaxLength(255)
  othersuccessstudymessage: string;

  //ส่วนของ นักศึกษา
  @IsString()
  @MaxLength(50)
  name_std: string;

  @IsString()
  @MaxLength(50)
  surname_std: string;

  @IsString()
  @Length(13, 13)
  id_std: string;

  @IsString()
  @Length(10, 10)
  phone_std: string;

  @IsNumber()
  lveducation: LevelEducation;

  @IsString()
  signature_std: string;
}
