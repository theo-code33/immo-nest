import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueriesUserDto } from './dto/queries-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(queries: QueriesUserDto) {
    const {
      name,
      order = 'ASC',
      order_by = 'name',
      per_page = 2,
      page = 1,
    } = queries;

    const query = await this.userRepository.createQueryBuilder('user');

    if (name) {
      query.andWhere('user.name LIKE :name', { name: `%${name}%` });
    }

    query.orderBy(`user.${order_by}`, order);
    query.take(per_page);
    query.offset((page - 1) * per_page);
    query.leftJoinAndSelect('user.adverts', 'advert');

    const usersList = await query.getMany();

    return usersList;
  }

  async findOne(id: number) {
    const query = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.adverts', 'advert')
      .where('user.id = :id', { id });

    const user = await query.getOne();

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    try {
      return this.userRepository.softDelete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
