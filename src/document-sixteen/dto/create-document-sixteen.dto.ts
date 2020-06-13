import {
  IsString,
  MaxLength,
  Length,
  IsNumber,
  IsNumberString,
  IsOptional,
} from "class-validator";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentSixteenDto {
  @IsNumberString()
  delaygraduationterm: number;

  @IsNumberString()
  delaygraduationyear: number;

  @IsString()
  @MaxLength(512)
  delaygraduationsince: string;

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
  deputy_dean_research_id: number;

  @IsNumber()
  @IsOptional()
  dean_id: number;
}
