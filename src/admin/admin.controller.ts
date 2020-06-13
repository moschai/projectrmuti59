import { Controller, Post, Body, ValidationPipe, Get, UseGuards } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';

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

    @UseGuards(AuthGuard('jwt-admin'))
    @Get()
    getAdmin() {
        return 'admin'
    }
}
