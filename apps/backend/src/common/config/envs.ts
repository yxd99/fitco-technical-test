import 'dotenv/config';
import * as joi from 'joi';

import { Environments } from '@common/constants/environments';

const envSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid(...Object.values(Environments))
      .default(Environments.development),
    PORT: joi.number().default(3000),
    DB_HOST: joi.string().default('localhost'),
    DB_PORT: joi.number().default(5432),
    DB_NAME: joi.string(),
    DB_USER: joi.string(),
    DB_PASSWORD: joi.string(),
    DB_SCHEMA: joi.string(),
    JWT_SECRET: joi.string(),
    JWT_EXPIRES_IN: joi.string(),
    CLOUDINARY_CLOUD_NAME: joi.string(),
    CLOUDINARY_API_KEY: joi.string(),
    CLOUDINARY_API_SECRET: joi.string(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
  NODE_ENV: value.ENV,
  PORT: value.PORT,
  DB_HOST: value.DB_HOST,
  DB_PORT: value.DB_PORT,
  DB_NAME: value.DB_NAME,
  DB_USER: value.DB_USER,
  DB_PASSWORD: value.DB_PASSWORD,
  DB_SCHEMA: value.DB_SCHEMA,
  JWT_SECRET: value.JWT_SECRET,
  JWT_EXPIRES_IN: value.JWT_EXPIRES_IN,
  CLOUDINARY_CLOUD_NAME: value.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: value.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: value.CLOUDINARY_API_SECRET,
};
