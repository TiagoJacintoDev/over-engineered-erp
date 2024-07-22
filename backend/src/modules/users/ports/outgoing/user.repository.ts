import { type AsyncMaybe } from '../../../../shared/core/Maybe';
import { type UserCommand } from '../../core/user.command';
import { type UserModel } from '../../core/user.model';

export interface UserRepository {
  getMany(): Promise<UserModel[]>;
  findById(userId: string): AsyncMaybe<UserModel>;
  findByEmail(email: string): AsyncMaybe<UserModel>;
  create(command: UserCommand): Promise<void>;
  update(command: UserCommand): Promise<void>;
  delete(userId: string): Promise<void>;
}
