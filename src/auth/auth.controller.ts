import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from './dto';
import { LoginUser } from './dto/Login.User.dto';
import { AuthGuard } from './guards';
import { Public } from './decorators/public.decorator';
import { GetUser } from './decorators/get.user.decorator';
import { User } from 'src/database/entities/User.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getUser();
  }

  @Post()
  @Public()
  async createUser(@Body() dto: CreateUser) {
    console.log(dto);
    return this.userService.create(dto);
  }

  @Post('token')
  @Public()
  @ApiCreatedResponse({
    description: 'User logged in',
  })
  @ApiBadRequestResponse({
    description: 'something wrong happened',
  })
  async login(@Body() dto: LoginUser) {
    return this.userService.loginUser(dto);
  }

  @Get('me')
  async getProfile(@GetUser() user: User) {
    return user;
  }
}
