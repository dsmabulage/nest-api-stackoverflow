import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
    constructor(data: { message: string; param: string }) {
        super(data, HttpStatus.BAD_REQUEST);
    }
}
