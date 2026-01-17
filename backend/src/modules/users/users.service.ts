import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      _id: '696aee878a0491747c284287',
      email: 'imran@gmail.com',
      password: '123456',
      name: 'imran',
    },
  ];

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
