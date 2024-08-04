import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from './organizations/organizations.module';
import { SchoolsModule } from './schools/schools.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4000,
      username: 'postgres',
      password: 'VTXuDx12',
      database: 'schooldb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    OrganizationsModule,
    SchoolsModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
