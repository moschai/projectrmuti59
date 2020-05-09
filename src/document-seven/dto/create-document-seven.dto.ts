import { IsArray, IsNotEmpty, ValidateNested, IsString, MaxLength, Length, IsNumber, IsInt } from "class-validator";
import { Type } from 'class-transformer'
import { SevenTableDto } from "./document-seven-table.dto";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentSevenDto {

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => SevenTableDto)
    tables: SevenTableDto[];

    @IsNumber()
    termregister: number;

    @IsNumber()
    yearregister: number;

    @IsNumber()
    termtotalunit: number;

    @IsNumber()
    withdrawregisterunit: number;

    @IsNumber()
    remainunit: number;

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



