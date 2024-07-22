import { authService } from '../ports';
import { AuthController } from './incoming/auth.controller';

const authController = new AuthController(authService);

export { authController };
