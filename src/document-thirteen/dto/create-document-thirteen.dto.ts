import {
  IsNumber,
  IsString,
  MaxLength,
  Length,
  IsInt,
  IsOptional,
  IsBoolean,
  IsNumberString,
} from "class-validator";
import { LevelEducation } from "src/document/enum/level-education.enum";
import { isNumber } from "util";

export class CreateDocumentThirteenDto {
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

  @IsNumber()
  @IsOptional()
  cersuccessunitthai: number;

  @IsBoolean()
  @IsOptional()
  certificateregister: boolean;

  @IsBoolean()
  @IsOptional()
  cerregisterthaiversion: boolean;

  @IsNumber()
  @IsOptional()
  cerregisterunitthai: number;

  @IsBoolean()
  @IsOptional()
  transcripstudy: boolean;

  @IsBoolean()
  @IsOptional()
  transcripthaiversion: boolean;

  @IsNumber()
  @IsOptional()
  transcripunitthai: number;

  @IsBoolean()
  @IsOptional()
  transcripengversion: boolean;

  @IsNumber()
  @IsOptional()
  transcripuniteng: number;

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
  dimplomalvone: boolean;

  @IsBoolean()
  @IsOptional()
  dpmlvonethaiversion: boolean;

  @IsNumber()
  @IsOptional()
  dpmlvoneunitthai: number;

  @IsBoolean()
  @IsOptional()
  dpmlvoneengversion: boolean;

  @IsNumber()
  @IsOptional()
  dpmlvoneuniteng: number;

  @IsBoolean()
  @IsOptional()
  dimplomalvtwo: boolean;

  @IsBoolean()
  @IsOptional()
  dpmlvtwothaiversion: boolean;

  @IsNumber()
  @IsOptional()
  dpmlvtwounitthai: number;

  @IsBoolean()
  @IsOptional()
  dpmlvtwoengversion: boolean;

  @IsNumber()
  @IsOptional()
  dpmlvtwouniteng: number;

  @IsBoolean()
  @IsOptional()
  dimplomalvthree: boolean;

  @IsBoolean()
  @IsOptional()
  dpmlvthreethaiversion: boolean;

  @IsNumber()
  @IsOptional()
  dpmlvthreeunitthai: number;

  @IsBoolean()
  @IsOptional()
  dpmlvthreeengversion: boolean;

  @IsNumber()
  @IsOptional()
  dpmlvthreeuniteng: number;

  @IsBoolean()
  @IsOptional()
  dimplomalvfour: boolean;

  @IsBoolean()
  @IsOptional()
  dpmlvfourthaiversion: boolean;

  @IsNumber()
  @IsOptional()
  dpmlvfourunitthai: number;

  @IsBoolean()
  @IsOptional()
  dpmlvfourengversion: boolean;

  @IsNumber()
  @IsOptional()
  dpmlvfouruniteng: number;

  @IsNumberString()
  @IsOptional()
  loststudentcard: number;

  @IsBoolean()
  @IsOptional()
  certificateunit: boolean;

  @IsBoolean()
  @IsOptional()
  ctfcthaiversion: boolean;

  @IsNumber()
  @IsOptional()
  ctfcunitthai: number;

  @IsBoolean()
  @IsOptional()
  otherdocument: boolean;

  @IsString()
  @MaxLength(255)
  othermassege: string;

  @IsBoolean()
  @IsOptional()
  otherdocthaiversion: boolean;

  @IsNumber()
  @IsOptional()
  otherdocunitthai: number;

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

  @IsNumberString()
  lveducation: LevelEducation;

  @IsString()
  signature_std: string;
}
