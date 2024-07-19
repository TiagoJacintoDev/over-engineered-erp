import { type AsyncMaybe } from '../../../../shared/core/Maybe';
import { type UserCommand } from '../../core/user.command';
import { type UserModel } from '../../core/user.model';

export interface UserRepository {
  getMany(companyId: string): Promise<UserModel[]>;
  findById(companyId: string, userId: string): AsyncMaybe<UserModel>;
  findByEmail(companyId: string, email: string): AsyncMaybe<UserModel>;
  create(command: UserCommand): Promise<void>;
  update(command: UserCommand): Promise<void>;
  delete(companyId: string, userId: string): Promise<void>;
}
