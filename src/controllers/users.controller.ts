import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Delete,
    Patch
} from '@nestjs/common';
import { CreateService } from '@/services/user/CreateService';
import { IndexService } from '@/services/user/IndexService';
import { ShowService } from '@/services/user/ShowService';
import { DeleteService } from '@/services/user/DeleteService';
import { UpdateService } from '@/services/user/UpdateService';
import { CreateUserDto } from '@/dto/user/CreateUserDto';
import { UpdateUserDto } from '@/dto/user/UpdateUserDto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly createService: CreateService,
        private readonly indexService: IndexService,
        private readonly showService: ShowService,
        private readonly updateService: UpdateService,
        private readonly deleteService: DeleteService
    ) {}

    @Get()
    getUsers() {
        return this.indexService.handle();
    }

    @Get('/:id')
    getUser(@Param('id') id: string) {
        return this.showService.handle(id);
    }

    @Post()
    createUser(
        @Body()
        dto: CreateUserDto
    ) {
        return this.createService.handle(dto, undefined);
    }

    @Patch('/:id')
    patchUser(
        @Param('id') id: string,
        @Body()
        dto: UpdateUserDto
    ) {
        return this.updateService.handle(id, dto, undefined);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.deleteService.handle(id, undefined);
    }
}
