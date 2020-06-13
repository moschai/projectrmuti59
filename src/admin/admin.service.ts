import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { fte_admin } from './admin.entity';
import { AdminAuthDto } from 'src/auth/dto/admin-login.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminRepository)
        private adminRepo: AdminRepository
    ) {

    }

    async createAdmin(createAdminDto: CreateAdminDto): Promise<any> {
        const adminCreated = await this.adminRepo.createAdmin(createAdminDto);
        const { password, salt, ...adminResponse } = adminCreated;
        return adminResponse;
    }


}
