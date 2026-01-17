import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getProfile(@Request() req) {
    if (!req.user) {
      return { success: false, message: 'Unauthorized' };
    }
    return { success: true, user: req.user };
  }
}
