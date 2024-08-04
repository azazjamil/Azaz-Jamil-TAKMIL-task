import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { School } from '../../schools/entities/school.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => School, (school) => school.organization)
  schools: School[];
}
