import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { AdvertService } from './advert.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { QueriesAdvertDto } from './dto/queries-advert.dto';

@Controller('adverts')
export class AdvertController {
  constructor(private readonly advertService: AdvertService) {}

  @Post()
  create(@Body() createAdvertDto: CreateAdvertDto) {
    return this.advertService.create(createAdvertDto);
  }

  @Get()
  findAll(@Query() queries: QueriesAdvertDto) {
    return this.advertService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdvertDto: UpdateAdvertDto) {
    return this.advertService.update(+id, updateAdvertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertService.remove(+id);
  }
}
