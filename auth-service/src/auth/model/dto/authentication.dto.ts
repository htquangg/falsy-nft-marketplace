import { IsNotEmpty } from 'class-validator';

export class AuthenticationDto {
  @IsNotEmpty({
    message: 'Address can not empty',
  })
  address: string;

  @IsNotEmpty({
    message: 'Signature can not empty',
  })
  signature: string;
}
