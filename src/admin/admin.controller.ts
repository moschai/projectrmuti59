import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(
        private adminService: AdminService
    ) { }

    @Post()
    createAdmin(
        @Body(new ValidationPipe()) createAdminDto: CreateAdminDto
    ) {
        return this.adminService.createAdmin(createAdminDto);
    }
}
