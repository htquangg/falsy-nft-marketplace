import { IsNotEmpty } from 'class-validator';

export class ChallengeDto {
  @IsNotEmpty({
    message: 'Address can not empty',
  })
  address: string;
}
