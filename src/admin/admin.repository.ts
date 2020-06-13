import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { fte_admin } from "./admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { AdminAuthDto } from "src/auth/dto/admin-login.dto";

@EntityRepository(fte_admin)
export class AdminRepository extends Repository<fte_admin>{

    async createAdmin(createAdminDto: CreateAdminDto) {
        const { username, password } = createAdminDto;
        const admin = new fte_admin();
        admin.username = username;
        admin.salt = await bcrypt.genSalt();
        admin.password = await this.hashPassword(password, admin.salt);
        try {
            return await admin.save();
        } catch (error) {
            if (error.sqlState === '23000') {
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    async validateAdminPassword(adminAuthDto: AdminAuthDto): Promise<any> {
        const { username, password } = adminAuthDto
        const admin = await this.findOne({ username })
        if (admin && await admin.validatePassword(password)) {
            // const { password, salt, ...adminReponse } = admin
            return admin
        } else {
            return undefined;
        }
    }

}