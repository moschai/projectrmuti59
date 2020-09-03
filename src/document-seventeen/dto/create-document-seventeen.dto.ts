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
