import { Request } from 'express';
import { UserPayload } from '@/infra/auth/jwt.strategy';

export interface AuthenticatedRequest extends Request {
  user: UserPayload;
}
