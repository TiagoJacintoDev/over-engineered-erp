import { type AsyncMaybe } from '../../../shared/core/Maybe';
import { type UserCommand } from '../user.command';
import { type UserModel } from '../user.model';

export interface UserRepository {
  getMany(companyId: string): Promise<UserModel[]>;
  find(companyId: string, userId: string): AsyncMaybe<UserModel>;
  findByEmail(companyId: string, email: string): AsyncMaybe<UserModel>;
  create(command: UserCommand): Promise<void>;
  update(command: UserCommand): Promise<void>;
  delete(companyId: string, userId: string): Promise<void>;
}
