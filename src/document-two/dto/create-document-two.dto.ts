import {
  IsString,
  MaxLength,
  Length,
  IsNumber,
  IsOptional,
  IsNumberString,
} from "class-validator";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentTwoDto {
  @IsNumberString()
  takeleaveterm: number;

  @IsNumberString()
  takeleaveyear: number;

  @IsString()
  @MaxLength(128)
  dear: string;

  @IsNumberString()
  returnterm: number;

  @IsNumberString()
  returnyear: number;

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

  //ส่วนของอาจารย์
  @IsNumber()
  advisor_id: number;

  @IsNumber()
  mastersubject_id: number;

  @IsNumber()
  @IsOptional()
  head_service_or_deanoffice_id: number;

  @IsNumber()
  @IsOptional()
  deputy_dean_research_id: number;

  @IsNumber()
  @IsOptional()
  dean_id: number;
}
