import {
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsString,
  MaxLength,
  Length,
  IsNumber,
  IsInt,
  IsNumberString,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";
import { SevenTableDto } from "./document-seven-table.dto";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentSevenDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SevenTableDto)
  tables: SevenTableDto[];

  @IsNumberString()
  termregister: number;

  @IsString()
  @MaxLength(128)
  yearregister: string;

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

  @IsNumber()
  advisor_id: number;
}
