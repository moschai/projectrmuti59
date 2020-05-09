import { IsArray, IsNotEmpty, ValidateNested, IsNumber, IsString, MaxLength, Length, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { LevelEducation } from "src/document/enum/level-education.enum";
import { TenTableDto } from "./document-ten-table.dto";

export class CreateDocumentTenDto {

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => TenTableDto)
    tables: TenTableDto[];
    @IsNumber()
    compareterm: number;

    @IsNumber()
    compareyeat: number;

    @IsString()
    @MaxLength(128)
    classyear: string;

    @IsNumber()
    timestudy: number;

    @IsNumber()
    typestudy: number;

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
    boardsubjectone_id: number;

    @IsInt()
    boardsubjecttwo_id: number;

    @IsInt()
    boardsubjectthree_id: number;

    @IsInt()
    boardsubjectfour_id: number;

    @IsInt()
    dean_id: number;


}