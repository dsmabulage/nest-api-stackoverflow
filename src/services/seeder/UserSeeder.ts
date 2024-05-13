import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories/User';
import { RoleRepository } from '@/repositories/Role';
import { ROLE_NAMES } from '@/entities/Role';

@Injectable()
export class UserSeeder {
    constructor(
        private userRepository: UserRepository,
        private roleRepository: RoleRepository
    ) {}

    async handle() {
        const [adminRole, userRole] = await Promise.all([
            this.roleRepository.findOne({ where: { name: ROLE_NAMES.ADMIN } }),
            this.roleRepository.findOne({ where: { name: ROLE_NAMES.USER } })
        ]);

        const admin = await this.userRepository.create({
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin.admin@gmail.com.test',
            password: '1234abcd',
            createdAt: new Date(),
            updatedAt: new Date(),
            role: adminRole
        });

        await this.userRepository.create({
            firstName: 'Joe',
            lastName: 'Doe',
            email: 'joe.doe@gmail.com.test',
            password: '1234abcd',
            createdAt: new Date(),
            updatedAt: new Date(),
            role: userRole,
            createdBy: admin
        });
    }
}
