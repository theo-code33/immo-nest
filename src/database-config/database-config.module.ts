import { Module } from '@nestjs/common';
import { DatabaseConfigService } from './database-config.service';
import { DatabaseConfigController } from './database-config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdvertModule } from 'src/advert/advert.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AdvertModule,
    UserModule,
  ],
  controllers: [
    process.env.NODE_ENV !== 'production' && DatabaseConfigController,
  ],
  providers: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
