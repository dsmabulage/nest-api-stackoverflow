import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginDto } from '@/dto/Auth/LoginDto';
import { UserRepository } from '@/repositories/User';

import { User } from '@/entities/User';
import { Request } from 'express';

@Injectable()
export class LoginService {
    constructor(private userRepository: UserRepository) {}

    async handle(data: LoginDto, req: Request): Promise<User> {
        const { email, password } = data;

        const user = await this.userRepository.findByEmail(email, {
            select: { password: true },
            where: { deletedAt: null }
        });

        if (!user) {
            throw new UnauthorizedException();
        }
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new UnauthorizedException();
        }

        const userWithAssociations = await this.userRepository.findByEmail(
            email,
            {
                relations: { role: true, createdBy: true }
            }
        );

        req.user = userWithAssociations;

        return userWithAssociations;
    }
}
