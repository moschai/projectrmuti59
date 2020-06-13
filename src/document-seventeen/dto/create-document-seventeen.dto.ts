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
import { SeventeenTableDto } from "./document-seventeen-table.dto";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentSeventeenDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SeventeenTableDto)
  tables: SeventeenTableDto[];

  @IsString()
  @MaxLength(50)
  idsubject: string;

  @IsString()
  @MaxLength(128)
  namesubject: string;

  @IsString()
  @MaxLength(128)
  groupstudy: string;

  @IsNumberString()
  registernow: number;

  @IsNumberString()
  registeradd: number;

  @IsString()
  @MaxLength(50)
  pastidsubject: string;

  @IsString()
  @MaxLength(128)
  pastnamesubject: string;

  @IsString()
  @MaxLength(50)
  newidsubject: string;

  @IsString()
  @MaxLength(128)
  newnamesubject: string;

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
  teacherteath_id: number;

  @IsNumber()
  @IsOptional()
  head_service_or_deanoffice_id: number;
}
