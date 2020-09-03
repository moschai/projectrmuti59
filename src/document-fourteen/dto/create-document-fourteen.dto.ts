import {
  IsString,
  MaxLength,
  Length,
  IsNumber,
  IsInt,
  IsNumberString,
  IsOptional,
} from "class-validator";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentFourteenDto {
  @IsString()
  @MaxLength(512)
  behavioralreceipt: string;

  @IsString()
  @MaxLength(128)
  classyear: string;

  @IsNumberString()
  timestudy: number;

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
  head_student_development_id: number;

  @IsNumber()
  @IsOptional()
  deputy_dean_student_development_id: number;

  @IsNumber()
  @IsOptional()
  dean_id: number;
}
