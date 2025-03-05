import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Environments } from '@common/constants/environments';

import { envs } from './envs';

export function config(): TypeOrmModuleOptions {
  const isProduction = envs.NODE_ENV === Environments.production;

  const extraConfig: Record<string, unknown> = {};

  if (isProduction) {
    extraConfig.ssl = {
      rejectUnauthorized: false,
    };
  }

  return {
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    database: envs.DB_NAME,
    schema: envs.DB_SCHEMA,
    type: 'postgres',
    ssl: isProduction,
    extra: {
      ...extraConfig,
    },
    synchronize: !isProduction,
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    autoLoadEntities: true,
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  };
}
