import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AdvertModule } from './advert/advert.module';
import { DatabaseConfigModule } from './database-config/database-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AdvertModule,
    DatabaseConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
