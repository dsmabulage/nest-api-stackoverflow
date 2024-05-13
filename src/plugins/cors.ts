import { ConfigService } from '@nestjs/config';

export const useCors = app => {
    const configService = app.get(ConfigService);

    app.enableCors({
        origin: [configService.get('frontendUrl')],
        credentials: true,
        allowedHeaders:
            'Content-Type,Accept,Authorization,X-Auth-Token,Access-Control-Allow-Origin,Access-Control-Expose-Headers'
    });
};
