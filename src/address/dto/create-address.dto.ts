import { IsString, IsNumber, Min, Max, Matches } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  town: string;

  @IsString()
  tehsil: string;

  @IsString()
  district: string;

  @IsString()
  state: string;

  @IsString()
  address: string;

  @IsNumber({}, { message: 'Latitude must be a number' })
  @Min(-90, { message: 'Latitude must be between -90 and 90' })
  @Max(90, { message: 'Latitude must be between -90 and 90' })
  latitude: number;

  @IsNumber({}, { message: 'Longitude must be a number' })
  @Min(-180, { message: 'Longitude must be between -180 and 180' })
  @Max(180, { message: 'Longitude must be between -180 and 180' })
  longitude: number;
}
