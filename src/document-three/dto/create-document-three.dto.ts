import { IsNumber, IsString, MaxLength, Length, IsInt } from "class-validator";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentThreeDto {

    @IsNumber()
    leaveterm: number;

    @IsNumber()
    leaveyear: number;

    @IsNumber()
    returnterm: number;

    @IsNumber()
    returnyear: number;


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

    @IsNumber()
    lveducation: LevelEducation;

    @IsNumber()
    id_major: number;

    //ส่วนของอาจารย์
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