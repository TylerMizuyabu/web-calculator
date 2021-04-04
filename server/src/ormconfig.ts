import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function getValue(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw Error(`Missing environment variable ${key}`);
  }
  return value;
}

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: getValue('DATABASE_URL'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: false,
  ssl:
    !process.env.LOCAL_RUN || process.env.LOCAL_RUN === 'false'
      ? {
          rejectUnauthorized: false,
        }
      : false,
};

export = ormConfig;
