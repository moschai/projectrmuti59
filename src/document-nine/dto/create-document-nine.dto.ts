import {
  IsNumber,
  IsString,
  MaxLength,
  Length,
  IsInt,
  IsOptional,
  IsNumberString,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from "class-validator";
import { LevelEducation } from "src/document/enum/level-education.enum";
import { Type } from "class-transformer";
import { NineTableDto } from "./document-nine-table.dto";

export class CreateDocumentNineDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => NineTableDto)
  tables: NineTableDto[];

  @IsNumberString()
  lastepaymentterm: number;

  @IsNumberString()
  latepaymentyear: number;

  @IsString()
  @MaxLength(512)
  latepaymentsince: string;

  @IsNumberString()
  topic: number;

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
