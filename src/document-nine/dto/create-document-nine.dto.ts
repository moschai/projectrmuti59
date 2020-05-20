import { IsNumber, IsString, MaxLength, Length, IsInt } from "class-validator";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentNineDto {


    @IsNumber()
    lastepaymentterm: number;

    @IsNumber()
    latepaymentyear: number;

    @IsString()
    @MaxLength(512)
    latepaymentsince: string;

    @IsNumber()
    certificateterm: number;

    @IsNumber()
    certificateyear: number;

    @IsNumber()
    idsubject: number;

    @IsString()
    @MaxLength(128)
    namesubject: string;

    @IsString()
    @MaxLength(128)
    groupstudy: string;

    @IsString()
    @MaxLength(128)
    nameauthority: string;

    @IsNumber()
    latepayregister: number;

    @IsNumber()
    latepayaddsubject: number;

    @IsNumber()
    latepaywithdraw: number;

    @IsString()
    @MaxLength(255)
    signatureteacher: string;

    @IsString()
    @MaxLength(255)
    signature: string;
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