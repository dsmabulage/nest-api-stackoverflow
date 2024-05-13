import { User } from '@/entities/User';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

declare module 'express-session' {
    interface SessionData {
        user?: string;
    }
}
