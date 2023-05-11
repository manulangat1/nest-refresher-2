import { IsEmail, IsInt, IsOptional, IsStrongPassword } from 'class-validator';
export class CreateUser {
  @IsInt()
  @IsOptional()
  id: number;

  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 4 })
  password: string;
}
