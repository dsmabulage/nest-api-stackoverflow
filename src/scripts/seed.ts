import { NestFactory } from '@nestjs/core';
import { Seeder } from '@/services/seeder/seeder';
import { SeederModule } from '@/modules/seeder.module';

async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
        .then(appContext => {
            const seeder = appContext.get(Seeder);
            seeder
                .handle()
                .then(() => {
                    console.debug('Seeding complete!');
                })
                .catch(error => {
                    console.error('Seeding failed!');
                    throw error;
                })
                .finally(() => appContext.close());
        })
        .catch(error => {
            throw error;
        });
}

bootstrap();
