import { IsString, IsBoolean, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../address/dto/create-address.dto';
import { CreateOrganizationDto } from '../../organizations/dto/create-organization.dto';

export class CreateSchoolDto {
  @IsString()
  name: string;

  @IsString()
  status: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsString()
  shift: string;

  @IsBoolean()
  hasProjector: boolean;

  @IsBoolean()
  hasLaptop: boolean;

  @IsObject()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsObject()
  @Type(() => CreateOrganizationDto)
  organization: CreateOrganizationDto;
}
