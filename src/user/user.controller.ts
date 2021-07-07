import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGaurd } from 'src/auth/auth.gaurd';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGaurd)
  @Get('admin/ambassadors')
  async ambassador() {
    return this.userService.find({
      is_ambassador: true,
    });
  }
}
