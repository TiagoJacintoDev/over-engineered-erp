import { type UserCommand } from '../../core/user.command';
import { type UserRepository } from '../outgoing/user.repository';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getUsers() {
    return this.repository.getMany();
  }

  async getUserByEmail(email: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new Error('User not found');

    return user;
  }

  async getUserById(userId: string) {
    const user = await this.repository.findById(userId);

    if (!user) throw new Error('User not found');

    return user;
  }

  async createUser(command: UserCommand) {
    const alreadyExistentUser = await this.repository.findByEmail(command.email);

    if (alreadyExistentUser) throw new Error('User already exists');

    await this.repository.create(command);
  }

  async updateUser(command: UserCommand) {
    const alreadyExistentUser = await this.repository.findByEmail(command.email);

    if (!alreadyExistentUser) throw new Error('User not found');

    await this.repository.update(command);
  }

  async deleteUser(userId: string) {
    const user = await this.repository.findById(userId);

    if (!user) throw new Error('User not found');

    await this.repository.delete(userId);
  }
}
