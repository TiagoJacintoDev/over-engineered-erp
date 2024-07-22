import bcrypt from 'bcrypt';

import { type UserService } from '../../../users/ports/incoming/user.service';

type LoginCommand = {
  email: string;
  password: string;
};

type SignUpCommand = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  country: string;
};

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(command: SignUpCommand) {
    await this.userService.createUser({
      email: command.email,
      firstName: command.firstName,
      lastName: command.lastName,
      password: bcrypt.hashSync(command.password, 10),
    });

    const user = await this.userService.getUserByEmail(command.email);

    return user.id;
  }

  async login(command: LoginCommand) {
    const user = await this.userService.getUserByEmail(command.email);

    if (!user) throw new Error('User not found');

    if (!user.password) throw new Error('User has no password');

    const passwordMatches = await bcrypt.compare(command.password, user.password);

    if (!passwordMatches) throw new Error('Invalid password');

    return user.id;
  }
}
