import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/User.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { LoginUser } from './dto/Login.User.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUser() {
    return this.userRepository.find();
  }
  async checkEmailExists(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async signToken(dto: User) {
    const payload = {
      email: dto.email,
      sub: dto.id,
    };
    return await this.jwtService.signAsync(payload);
  }
  // async getUserByEmail
  async create(dto: any): Promise<User[]> {
    const { email, password, ...others } = dto;
    const userExists = await this.checkEmailExists(email);
    if (userExists) {
      throw new HttpException(
        'User already exists with given credentials',
        403,
      );
      //   throw new ForbiddenException('User already exists');
    }
    // hash the password
    const hash = await argon2.hash(password);

    console.log(hash);

    const new_user = await this.userRepository.create({
      email,
      password: hash,
      joined_at: new Date(),
      ...others,
    });
    // send email functionality
    return this.userRepository.save(new_user);
  }

  async loginUser(dto: LoginUser): Promise<any> {
    const { email, password } = dto;

    const user = await this.checkEmailExists(email);

    if (!user) {
      throw new HttpException(
        'User already exists with given credentials',
        403,
      );
      //   throw new ForbiddenException('User');
      //   throw new HttpException('Credentials not found', 400);
    }

    // console.log(user);

    const passwordMatch = await argon2.verify(user.password, password);

    // console.log(passwordMatch);
    if (!passwordMatch) {
      throw new ForbiddenException('User');
      //   throw new HttpException('Credentials used are wrong', 400);
    }

    const token = await this.signToken(user);

    return { user, token };
  }
}
