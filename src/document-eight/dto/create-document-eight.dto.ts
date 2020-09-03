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
  IsBoolean,
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

  @IsString()
  @MaxLength(128)
  movinggroupyear: string;

  @IsString()
  @MaxLength(128)
  termstudy: string;

  @IsString()
  @MaxLength(128)
  yearstudy: string;

  @IsString()
  @MaxLength(128)
  classyear: string;

  @IsString()
  @MaxLength(128)
  timestudy: string;

  @IsNumberString()
  @IsOptional()
  since: number;

  @IsBoolean()
  @IsOptional()
  otherdocument: boolean;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  othermassege: string;

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
  advisornew_id: number;
}
