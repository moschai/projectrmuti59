import {
  IsNumber,
  IsString,
  MaxLength,
  Length,
  IsOptional,
  IsNumberString,
  MinLength,
} from "class-validator";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentFourDto {
  @IsNumberString()
  sumorremainunit: number;

  @IsNumberString()
  overlowstandard: number;

  @IsString()
  @MinLength(0)
  @MaxLength(512)
  overslowstandardsince: string;

  @IsString()
  @MaxLength(128)
  dear: string;

  @IsString()
  @MaxLength(128)
  termstudy: string;

  @IsString()
  @MaxLength(128)
  yearstudy: string;

  @IsString()
  @MaxLength(128)
  cumulativeGpa: string;

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
