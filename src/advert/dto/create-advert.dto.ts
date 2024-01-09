import { UserEntity } from 'src/user/entities/user.entity';

export class CreateAdvertDto {
  title: string;
  price: number;
  nb_rooms: number;
  square_meters: number;
  description: string;
  phoneNumber: string;
  user?: UserEntity;
}
