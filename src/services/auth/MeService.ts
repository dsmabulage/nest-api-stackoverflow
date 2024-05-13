import { UserRepository } from '@/repositories/User';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '@/entities/User';
import { Request } from 'express';

@Injectable()
export class MeService {
    constructor(private readonly userRepository: UserRepository) {}

    async handle(req: Request): Promise<User> {
        const id = req.user.id;

        if (!id) {
            throw new UnauthorizedException();
        }

        return this.userRepository.findOne({
            where: { id },
            relations: {
                createdBy: true,
                role: true
            },
            withDeleted: true
        });
    }
}
