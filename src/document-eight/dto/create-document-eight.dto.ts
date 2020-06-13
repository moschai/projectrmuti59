import {
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsString,
  MaxLength,
  Length,
  IsInt,
  IsNumberString,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import { EightTableDto } from "./document-eight-table.dto";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentEightDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EightTableDto)
  tables: EightTableDto[];
  @IsNumberString()
  movinggroupterm: number;

  @IsNumberString()
  movinggroupyear: number;

  @IsString()
  @MaxLength(512)
  movinggroupsince: string;

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
