import { IsArray, IsNotEmpty, ValidateNested, IsNumber, IsString, MaxLength, Length, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { SixTableDto } from "./document-six-table.dto";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentSixDto {

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => SixTableDto)
    tables: SixTableDto[];

    @IsNumber()
    termregister: number;

    @IsNumber()
    yearregister: number;

    @IsNumber()
    termtotalunit: number;

    @IsNumber()
    addregisterunit: number;

    @IsNumber()
    termsumtotalunit: number;


    //ส่วนของ นักศึกษา
    @IsString()
    @MaxLength(50)
    name_std: string;

    @IsString()
    @MaxLength(50)
    surname_std: string;

    @IsString()
    @Length(14, 14)
    id_std: string;

    @IsString()
    @Length(10, 10)
    phone_std: string;

    @IsNumber()
    lveducation: LevelEducation;

    @IsNumber()
    id_major: number;

    @IsInt()
    advisor_id: number;

    @IsInt()
    mastersubject_id: number;

    @IsInt()
    head_service_or_deanoffice_id: number;

    @IsInt()
    deputy_dean_research_id: number;

    @IsInt()
    dean_id: number;


}