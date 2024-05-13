import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const env = (envName: string, defaultValue = ''): string =>
    process.env[envName] || defaultValue;

const dir = `${process.env.NODE_ENV === 'dev' ? 'src' : 'dist'}`;

export const dbdatasource: DataSourceOptions = {
    type: 'postgres',
    host: env('POSTGRES_HOST', 'localhost'),
    port: +env('POSTGRES_PORT', '5432'),
    username: env('POSTGRES_USER', 'user'),
    password: env('POSTGRES_PASSWORD'),
    database: env('POSTGRES_DB', 'database'),
    synchronize: false,
    migrations: [`${dir}/migrations/*.{ts,js}`, `${dir}/seeders/*.{ts,js}`],
    entities: [`${dir}/entities/*.{ts,js}`]
};

const AppDataSouce = new DataSource(dbdatasource);

export default AppDataSouce;
