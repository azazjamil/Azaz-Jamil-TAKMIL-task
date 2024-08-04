import { Organization } from './../organizations/entities/organization.entity';
import { Address } from './../address/entities/address.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const school = this.schoolRepository.create(createSchoolDto);
    return this.schoolRepository.save(school);
  }

  findAll(): Promise<School[]> {
    return this.schoolRepository.find({
      relations: ['address', 'organization'],
    });
  }

  findOne(id: string): Promise<School> {
    return this.schoolRepository.findOne({
      where: { id },
      relations: ['address', 'organization'],
    });
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    await this.schoolRepository.update(id, updateSchoolDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    // Fetch the school along with related addresses and organizations
    const school = await this.schoolRepository.findOne({
      where: { id },
      relations: ['address', 'organization'],
    });

    if (!school) {
      throw new Error('School not found');
    }

    // Collect IDs of related addresses and organizations
    const addressIds = school.address.id;
    const organizationIds = school.organization.id;

    // Delete related addresses
    if (addressIds.length > 0) {
      await this.addressRepository.delete(addressIds);
    }

    // Delete related organizations
    if (organizationIds.length > 0) {
      await this.organizationRepository.delete(organizationIds);
    }

    // Finally, delete the school itself
    await this.schoolRepository.delete(id);
  }
}
