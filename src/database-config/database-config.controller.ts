import { Controller, Post } from '@nestjs/common';
import { DatabaseConfigService } from './database-config.service';

@Controller('fixtures')
export class DatabaseConfigController {
  constructor(private readonly databaseConfigService: DatabaseConfigService) {}

  @Post('adverts')
  createFixturesAdverts() {
    return this.databaseConfigService.createFixturesAdverts();
  }

  @Post('user')
  createFixturesUser() {
    return this.databaseConfigService.createFixturesUser();
  }
}
