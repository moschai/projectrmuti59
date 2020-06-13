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
import { LevelEducation } from "src/document/enum/level-education.enum";
import { TenTableDto } from "./document-ten-table.dto";
import { isNumber } from "util";

export class CreateDocumentTenDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TenTableDto)
  tables: TenTableDto[];

  @IsNumberString()
  compareterm: number;

  @IsNumberString()
  compareyeat: number;

  @IsString()
  @MaxLength(128)
  classyear: string;

  @IsNumberString()
  timestudy: number;

  @IsNumberString()
  typestudy: number;

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
  boardsubjectone_id: number;

  @IsNumber()
  @IsOptional()
  boardsubjecttwo_id: number;

  @IsNumber()
  @IsOptional()
  boardsubjectthree_id: number;

  @IsNumber()
  @IsOptional()
  boardsubjectfour_id: number;

  @IsNumber()
  @IsOptional()
  dean_id: number;
}
