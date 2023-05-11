import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProduct {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  discountedPrice: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;
}
