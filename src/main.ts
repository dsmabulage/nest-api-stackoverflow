import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { useCors } from '@/plugins/cors';
import { AppModule } from '@/modules/app.module';
import { useValidationPipe } from '@/plugins/validationPipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    useCors(app);
    useValidationPipe(app);

    const port = app.get(ConfigService).get('app.port');

    await app.listen(port);
}
bootstrap();
