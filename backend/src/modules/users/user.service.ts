import { type UserRepository } from './ports/user.repository';
import { type UserCommand } from './user.command';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getUsers(companyId: string) {
    return this.repository.getMany(companyId);
  }

  async getUser(companyId: string, userId: string) {
    const user = await this.repository.find(companyId, userId);

    if (!user) throw new Error('User not found');

    return user;
  }

  async createUser(command: UserCommand) {
    const alreadyExistentUser = await this.repository.findByEmail(command.companyId, command.email);

    if (alreadyExistentUser) throw new Error('User already exists');

    await this.repository.create(command);
  }

  async updateUser(command: UserCommand) {
    const alreadyExistentUser = await this.repository.findByEmail(command.companyId, command.email);

    if (!alreadyExistentUser) throw new Error('User not found');

    await this.repository.update(command);
  }

  async deleteUser(companyId: string, userId: string) {
    const user = await this.repository.find(companyId, userId);

    if (!user) throw new Error('User not found');

    await this.repository.delete(companyId, userId);
  }
}