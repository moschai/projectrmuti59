import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorityRepository } from './authority.repository';
import { MajorRepository } from './major.repository';
import { CreateAuthorityDto } from './dto/create-authority.dto';

@Injectable()
export class AuthorityService {
    constructor(
        @InjectRepository(AuthorityRepository)
        private authorityRepository: AuthorityRepository,
        @InjectRepository(MajorRepository)
        private majorRepository: MajorRepository
    ) { }

    async getAuthoritysAll() {
        return await this.authorityRepository.find();
    }

    async getAuthorityByMajorId(majorId) {
        const major = await this.majorRepository.findOne({ id_major: majorId });
        if (!major) {
            throw new NotFoundException('ข้อมูลไม่ถูกต้องกรุณากรอกข้อมูลใหม่อีกครั้ง')
        }
        return await this.authorityRepository.find({ major });
    }

    async getMajors() {
        return await this.majorRepository.find();
    }

    async createAuthority(createAuthorityDto: CreateAuthorityDto) {
        return;
    }
}
