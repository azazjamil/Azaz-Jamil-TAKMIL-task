import { Organization } from './../organizations/entities/organization.entity';
import { Address } from './../address/entities/address.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { School } from './entities/school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School, Address, Organization])],
  providers: [SchoolsService],
  controllers: [SchoolsController],
})
export class SchoolsModule {}
