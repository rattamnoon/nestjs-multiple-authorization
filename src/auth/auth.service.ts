import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne(username);

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const result = {
      username: user.username,
      userId: user.userId,
    };

    return result;
  }
}
