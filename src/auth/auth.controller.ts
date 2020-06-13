import { Controller, Post, Body, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminAuthDto } from './dto/admin-login.dto';
import { AuthService } from './auth.service';
import { AuthorityAuthDto } from './dto/authority-login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {

    }

    @Post('admin-auth')
    @HttpCode(HttpStatus.OK)
    adminLogin(@Body(new ValidationPipe()) adminAuthDto: AdminAuthDto) {
        return this.authService.adminAuth(adminAuthDto)
    }

    @Post('authority-auth')
    @HttpCode(HttpStatus.OK)
    authorityLogin(@Body(new ValidationPipe()) authorityAuthDto: AuthorityAuthDto) {
        return this.authService.authorityAuth(authorityAuthDto)
    }
}
