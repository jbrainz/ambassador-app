import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthGaurd } from './auth.gaurd';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  @Post('admin/register')
  async register(@Body() body: RegisterDto) {
    const { password_confirm, ...data } = body;
    if (body.password !== body.password_confirm) {
      throw new BadRequestException(
        'Password do not match',
        'please enter a valid password btw 6- 50 chars',
      );
    }
    const hashed = await bcrypt.hash(body.password, 12);
    return this.userService.save({
      ...data,
      password: hashed,
      is_ambassador: false,
    });
  }
  @Post('admin/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new BadRequestException('Invalid Credenttials');
    }
    const jwt = await this.jwtService.signAsync({
      id: user.id,
    });
    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'success',
    };
  }
  @UseGuards(AuthGaurd)
  @Get('admin/user')
  async user(@Req() request: Request) {
    const cookie = await request.cookies['jwt'];
    const { id } = await this.jwtService.verifyAsync(cookie);
    const user = await this.userService.findOne({ id });
    return user;
  }
  @UseGuards(AuthGaurd)
  @Post('admin/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'successfuly logged out',
    };
  }
  @UseGuards(AuthGaurd)
  @Put('admin/user/info')
  async updateInfo(
    @Req() request: Request,
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
  ) {
    const cookie = await request.cookies['jwt'];

    const { id } = await this.jwtService.verifyAsync(cookie);

    await this.userService.update(id, {
      first_name,
      last_name,
      email,
    });
    return this.userService.findOne({ id });
  }
  @UseGuards(AuthGaurd)
  @Put('admin/user/password')
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    const cookie = await request.cookies['jwt'];

    const { id } = await this.jwtService.verifyAsync(cookie);

    if (password !== password_confirm) {
      throw new BadRequestException(
        'Password do not match',
        'please enter a valid password btw 6- 50 chars',
      );
    }
    const hashed = await bcrypt.hash(password, 12);
    await this.userService.update(id, {
      password: hashed,
    });
    return {
      message: 'password update successful',
    };
  }
}
