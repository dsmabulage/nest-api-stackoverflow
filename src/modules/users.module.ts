import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User } from '@/entities/User';
import { RolesModule } from '@/modules/roles.module';
import { UserRepository } from '@/repositories/User';
import { ShowService } from '@/services/user/ShowService';
import { IndexService } from '@/services/user/IndexService';
import { CreateService } from '@/services/user/CreateService';
import { UpdateService } from '@/services/user/UpdateService';
import { DeleteService } from '@/services/user/DeleteService';
import { UsersController } from '@/controllers/users.controller';

@Module({
    imports: [RolesModule, TypeOrmModule.forFeature([User])],
    providers: [
        UserRepository,
        ShowService,
        IndexService,
        CreateService,
        UpdateService,
        DeleteService
    ],
    controllers: [UsersController],
    exports: [UserRepository]
})
export class UsersModule {}
