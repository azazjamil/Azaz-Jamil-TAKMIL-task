import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(address);
  }

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  async update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    await this.addressRepository.update(id, updateAddressDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.addressRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
  }
}
