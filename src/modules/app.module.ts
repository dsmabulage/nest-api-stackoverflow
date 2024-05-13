import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { AppService } from '@/services/app.service';
import { RolesModule } from './roles.module';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';

@Module({
    imports: [DatabaseModule, AuthModule, UsersModule, RolesModule],
    controllers: [],
    providers: [AppService]
})
export class AppModule {}
