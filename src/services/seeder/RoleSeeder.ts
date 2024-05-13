import { ROLE_NAMES, Role } from '@/entities/Role';
import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@/repositories/Role';

@Injectable()
export class RoleSeeder {
    constructor(private roleRepository: RoleRepository) {}

    handle(): Promise<[Role, Role]> {
        return Promise.all([
            this.roleRepository.create({
                name: ROLE_NAMES.ADMIN
            }),
            this.roleRepository.create({
                name: ROLE_NAMES.USER
            })
        ]);
    }
}
