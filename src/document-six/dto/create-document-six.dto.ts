import {
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsString,
  MaxLength,
  Length,
  IsNumberString,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import { SixTableDto } from "./document-six-table.dto";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentSixDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SixTableDto)
  tables: SixTableDto[];

  @IsNumberString()
  termregister: number;

  @IsNumberString()
  yearregister: number;

  @IsNumberString()
  termtotalunit: number;

  @IsString()
  @MaxLength(128)
  classyear: string;

  @IsString()
  @MaxLength(128)
  since: string;

  @IsNumberString()
  timestudy: number;

  @IsNumberString()
  PlsRegisOverLow: number;

  @IsString()
  @MaxLength(128)
  dear: string;

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
