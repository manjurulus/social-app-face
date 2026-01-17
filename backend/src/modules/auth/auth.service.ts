import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(email: string, password: string) {
    // ⚠️ Replace with real user lookup + password check
    if (email !== 'imran@gmail.com' || password !== '123456') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email, sub: '696aee878a0491747c284287' };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
