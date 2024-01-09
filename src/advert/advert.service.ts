import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { AdvertEntity } from './entities/advert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueriesAdvertDto } from './dto/queries-advert.dto';

@Injectable()
export class AdvertService {
  constructor(
    @InjectRepository(AdvertEntity)
    private advertRepository: Repository<AdvertEntity>,
  ) {}

  async create(createAdvertDto: CreateAdvertDto) {
    try {
      const advert = await this.advertRepository.create(createAdvertDto);
      return await this.advertRepository.save(advert);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(queries: QueriesAdvertDto) {
    const {
      min_price,
      max_price,
      order = 'ASC',
      order_by = 'price',
      per_page = 2,
      page = 1,
      min_nb_rooms,
      max_nb_rooms,
      min_square_meters,
      max_square_meters,
      username,
    } = queries;

    try {
      const query = await this.advertRepository.createQueryBuilder('advert');

      if (min_price) {
        query.andWhere('advert.price >= :min_price', { min_price });
      }

      if (max_price) {
        query.andWhere('advert.price <= :max_price', { max_price });
      }

      if (min_nb_rooms) {
        query.andWhere('advert.nb_rooms >= :min_nb_rooms', { min_nb_rooms });
      }

      if (max_nb_rooms) {
        query.andWhere('advert.nb_rooms <= :max_nb_rooms', { max_nb_rooms });
      }

      if (min_square_meters) {
        query.andWhere('advert.square_meters >= :min_square_meters', {
          min_square_meters,
        });
      }

      if (max_square_meters) {
        query.andWhere('advert.square_meters <= :max_square_meters', {
          max_square_meters,
        });
      }

      if (username) {
        query.andWhere('advert.user.username = :username', { username });
      }
      query.orderBy(`advert.${order_by}`, order);

      query.take(per_page);
      query.offset((page - 1) * per_page);

      query.leftJoinAndSelect('advert.user', 'user');

      const [data, count] = await query.getManyAndCount();

      return {
        data,
        count,
        per_page,
        page,
        last_page: Math.ceil(count / per_page),
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    const advert = await this.advertRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!advert)
      throw new HttpException('Advert not found', HttpStatus.NOT_FOUND);

    return advert;
  }

  async update(id: number, updateAdvertDto: UpdateAdvertDto) {
    try {
      const advert = await this.advertRepository.update(id, updateAdvertDto);
      return advert;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const advert = await this.findOne(id);

    try {
      return this.advertRepository.softRemove(advert);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
