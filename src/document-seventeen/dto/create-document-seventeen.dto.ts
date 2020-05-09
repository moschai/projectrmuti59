import { IsArray, IsNotEmpty, ValidateNested, IsNumber, IsString, MaxLength, Length, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { SeventeenTableDto } from "./document-seventeen-table.dto";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentSeventeenDto {

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => SeventeenTableDto)
    tables: SeventeenTableDto[];

    @IsNumber()
    idsubject: number;

    @IsString()
    @MaxLength(128)
    namesubject: string;

    @IsString()
    @MaxLength(128)
    groupstudy: string;

    @IsNumber()
    registernow: number;

    @IsNumber()
    registeradd: number;

    @IsNumber()
    pastidsubject: number;

    @IsString()
    @MaxLength(128)
    pastnamesubject: string;

    @IsNumber()
    newidsubject: number;

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
    teacherteath_id: number;

    @IsInt()
    head_service_or_deanoffice_id: number;


}