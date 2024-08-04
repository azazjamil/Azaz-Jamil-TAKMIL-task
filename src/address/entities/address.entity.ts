import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  town: string;

  @Column()
  tehsil: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column()
  address: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitude?: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitude?: number;
}
