import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Public } from '../common/decorators';
import { AccessTokenGuard } from '../common/guards';

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Add User
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // Get All Users

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  // Get one Users by Id
  // @Get(':id')
  // getOneUser(@Param('id') id: number) {
  //   return this.userService.getOneUser(id);
  // }

  // Update Users
  // @Put(':id')
  // update(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
  //   return this.userService.update(id, createUserDto);
  // }

  // Delete User
  // @Delete(':id')
  // delete(@Param('id') id: number) {
  //   return this.userService.delete(id);
  // }
}
