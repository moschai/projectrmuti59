import {
  IsNumber,
  IsString,
  MaxLength,
  Length,
  IsNumberString,
  IsOptional,
} from "class-validator";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentThreeDto {
  @IsNumberString()
  leaveterm: number;

  @IsString()
  @MaxLength(10)
  leaveyear: string;

  @IsNumberString()
  returnterm: number;

  @IsString()
  @MaxLength(10)
  returnyear: string;

  @IsString()
  @MaxLength(128)
  classyear: string;

  @IsNumberString()
  timestudy: number;

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

  @IsString()
  @MaxLength(255)
  email_std: string;

  @IsNumber()
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
