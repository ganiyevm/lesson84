import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from '../common/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      // check user
      const candidate = await this.prismaService.users.findUnique({
        where: {
          email: createUserDto.email,
        },
      });
      if (candidate) {
        throw new BadRequestException('Bunday email mavjud');
      }

      // hash password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 7);

      // create user
      const newUser = await this.prismaService.users.create({
        data: {
          fullname: createUserDto.fullname,
          email: createUserDto.email,
          password: hashedPassword,
        },
      });

      // create token
      const jwtPayload: JwtPayload = {
        sub: newUser.id,
        email: newUser.email,
      };
      const token = await this.jwtService.sign(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      });

      return token;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllUsers() {
    const users = await this.prismaService.users.findMany();
    return users;
  }
}
