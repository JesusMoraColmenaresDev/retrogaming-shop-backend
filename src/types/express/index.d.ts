import { UserJwtPayload } from '../../entities/user/userTypes';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserJwtPayload;
  }
}
