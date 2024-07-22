import { userService } from '../../users/ports';
import { AuthService } from './incoming/auth.service';

const authService = new AuthService(userService);

export { authService };
