import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from '@/controllers/users.controller';
import { User } from '@/entities/User';
import { RolesModule } from '@/modules/roles.module';
import { UserRepository } from '@/repositories/User';
import { LoginService } from '@/services/auth/LoginService';
import { LogoutService } from '@/services/auth/LogoutService';
import { MeService } from '@/services/auth/MeService';
import { CreateService } from '@/services/user/CreateService';
import { DeleteService } from '@/services/user/DeleteService';
import { IndexService } from '@/services/user/IndexService';
import { ShowService } from '@/services/user/ShowService';
import { UpdateService } from '@/services/user/UpdateService';

@Module({
    imports: [RolesModule, TypeOrmModule.forFeature([User])],
    providers: [
        UserRepository,
        ShowService,
        IndexService,
        CreateService,
        UpdateService,
        DeleteService,
        LogoutService,
        MeService,
        LoginService
    ],
    controllers: [UsersController],
    exports: [UserRepository, LogoutService, MeService, LoginService]
})
export class UsersModule {}
