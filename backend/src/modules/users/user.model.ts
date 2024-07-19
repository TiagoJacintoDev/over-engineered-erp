import { type Maybe } from '../../shared/core/Maybe';
import { type UserStatus } from './core/user-status';
import { type UserType } from './core/user-type';

export type UserModel = {
  id: string;
  firstName: string;
  lastName: string;
  country: Maybe<string>;
  password: Maybe<string>;
  email: string;
  status: UserStatus;
  type: UserType;
};
