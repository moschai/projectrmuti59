import { IsString, MaxLength, Length, IsNumber, IsInt } from "class-validator";
import { LevelEducation } from "src/document/enum/level-education.enum";

export class CreateDocumentFifteenDto {

    @IsNumber()
    graduationrequestterm: number;

    @IsNumber()
    graduationrequestyear: number;

    @IsString()
    @MaxLength(128)
    classyear: string;

    @IsString()
    @MaxLength(128)
    timestudy: string;

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
    authority_activity_id: number;


}