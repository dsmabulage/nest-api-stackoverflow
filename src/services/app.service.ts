import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    async handle() {
        return 'default';
    }
}
