import { Inject, Injectable } from '@nestjs/common';
import { AdvertService } from 'src/advert/advert.service';
import { faker } from '@faker-js/faker';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DatabaseConfigService {
  constructor(
    @Inject(AdvertService)
    private readonly advertService: AdvertService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async createFixturesAdverts() {
    const user = await this.createFixturesUser();
    for (let i = 0; i < 2; i++) {
      this.advertService.create({
        title: faker.lorem.words(3),
        price: this.randomNumber(200, 2000),
        nb_rooms: this.randomNumber(1, 6),
        square_meters: this.randomNumber(9, 120),
        description: faker.lorem.paragraphs(3),
        phoneNumber: faker.phone.number(),
        user: user.body,
      });
    }

    return {
      message: 'Fixtures created',
    };
  }

  async createFixturesUser() {
    const newUser = await this.userService.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.firstName(),
    });
    return {
      message: 'User created',
      body: newUser,
    };
  }
}
