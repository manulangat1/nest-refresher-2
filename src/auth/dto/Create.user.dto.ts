import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsStrongPassword } from 'class-validator';
export class CreateUser {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  id: number;

  @ApiProperty({
    description: ' Email',
    default: 'john@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    default: 'john@1234T',
  })
  @IsStrongPassword({ minLength: 4 })
  password: string;
}
