import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUser {
  @ApiProperty({
    description: 'Email of the user',
    default: 'john.doe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user ',
    default: '123456@Qwerty',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
