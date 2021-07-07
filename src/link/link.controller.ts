import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGaurd } from 'src/auth/auth.gaurd';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @UseGuards(AuthGaurd)
  @Get('admin/user/:id/links')
  async all(@Param('id') id: number) {
    return this.linkService.find({
      user: id,
      relations: ['orders'],
    });
  }
}
