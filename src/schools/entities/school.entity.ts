import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { Organization } from '../../organizations/entities/organization.entity';

@Entity()
export class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  shift: string;

  @Column()
  hasProjector: boolean;

  @Column()
  hasLaptop: boolean;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Organization, (organization) => organization.schools, {
    cascade: true,
  })
  organization: Organization;
}
