import {
  IsString,
  MaxLength,
  Length,
  IsInt,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsObject,
  IsNumber,
  IsNumberString,
  IsOptional,
  MinLength,
} from "class-validator";
import { Type } from "class-transformer";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentOneDto {
  @IsString()
  @MaxLength(128)
  topic: string;

  @IsString()
  @MaxLength(128)
  dear: string;

  @IsString()
  @MaxLength(128)
  purpose: string;

  @IsString()
  @MaxLength(512)
  since: string;

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
