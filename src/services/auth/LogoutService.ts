import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LogoutService {
    async handle(req: Request): Promise<void> {
        return new Promise<void>(resolve =>
            req.session.destroy(error => {
                if (error) {
                    throw error;
                }

                resolve();
            })
        );
    }
}
