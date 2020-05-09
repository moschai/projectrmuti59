import { IsString, Length } from "class-validator";

export class CreateAdminDto {

    @IsString()
    @Length(5, 50)
    username: string;

    @IsString()
    @Length(8, 50)
    password: string;

    //test commit
}