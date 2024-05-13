import * as dotenv from 'dotenv';

dotenv.config();

const env = (envName: string, defaultValue = ''): string =>
    process.env[envName] || defaultValue;

const PROD_ENVIRONMENTS = ['prod', 'production'];
const currentEnvironment = process.env.NODE_ENV;

const nodeEnvironment = env('NODE_ENV', 'dev');

export const config = () => ({
    app: {
        env: nodeEnvironment,
        port: +env('NODE_PORT', '3000'),
        frontendUrl: env('APP_FRONTEND_URL', 'http://localhost:8080'),
        appUrl: env('APP_URL', 'http://localhost:3000'),
        isProd: PROD_ENVIRONMENTS.includes(currentEnvironment)
    },
    database: {
        url: `postgres://${env('POSTGRES_USER', 'user')}:${env('POSTGRES_PASSWORD')}@${env('POSTGRES_HOST', 'localhost')}:${+env('POSTGRES_PORT', '5432')}/${env('POSTGRES_DB', 'database')}?${
            nodeEnvironment === 'prod' ? 'sslmode=require' : ''
        }`,
        type: 'postgres',
        host: env('POSTGRES_HOST', 'localhost'),
        port: +env('POSTGRES_PORT', '5432'),
        username: env('POSTGRES_USER', 'postgres'),
        password: env('POSTGRES_PASSWORD'),
        database: env('POSTGRES_DB', 'database'),
        synchronize: nodeEnvironment === 'test'
    },
    redisSession: {
        host: env('REDIS_SESSION_HOST'),
        port: parseInt(env('REDIS_SESSION_PORT')),
        password: env('REDIS_SESSION_PASS')
    },
    session: {
        secret: env('SESSION_SECRET', 'secret')
    }
});
