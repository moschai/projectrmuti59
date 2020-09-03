import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorityRepository } from "./authority.repository";
import { MajorRepository } from "./major.repository";
import { CreateAuthorityDto } from "./dto/create-authority.dto";
import { FacultyRepository } from "./faculty.reposity";
import { fte_major } from "./major.entity";

@Injectable()
export class AuthorityService {
  constructor(
    @InjectRepository(AuthorityRepository)
    private authorityRepository: AuthorityRepository,
    @InjectRepository(MajorRepository)
    private majorRepository: MajorRepository,
    @InjectRepository(FacultyRepository)
    private facultyRepo: FacultyRepository
  ) {}

  async getAuthorityById(id: number) {
    return await this.authorityRepository.findOne({ id_authority: id });
  }

  async getAuthoritysAll() {
    return await this.authorityRepository.find();
  }

  async getAuthorityByMajorId(majorId) {
    const major = await this.majorRepository.findOne({ id_major: majorId });
    if (!major) {
      throw new NotFoundException(
        "ข้อมูลไม่ถูกต้องกรุณากรอกข้อมูลใหม่อีกครั้ง"
      );
    }
    return await this.authorityRepository.find({ major });
  }

  async getMajors() {
    return await this.majorRepository.find();
  }

  async createAuthority(createAuthorityDto: CreateAuthorityDto) {
    const major =
      (await this.majorRepository.findOne({
        id_major: createAuthorityDto.major,
      })) || new fte_major();
    if (!major && createAuthorityDto.major) {
      throw new NotFoundException("ไม่พบสาขา");
    }
    if (!createAuthorityDto.major) {
      const faculty = await this.facultyRepo.findOne({
        id_faculty: createAuthorityDto.faculty,
      });
      if (!faculty) {
        throw new NotFoundException("ไม่พบคณะ");
      }
      major.faculty = faculty;
    }
    const authorityCreated = await this.authorityRepository.createAuthority(
      createAuthorityDto,
      major
    );
    const { password, salt, ...authorityResponse } = authorityCreated;
    return authorityResponse;
  }
}
