import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organization = this.organizationRepository.create(
      createOrganizationDto,
    );
    return this.organizationRepository.save(organization);
  }

  findAll(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  async findOne(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }

  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    await this.organizationRepository.update(id, updateOrganizationDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.organizationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
  }
}
