import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as hpp from 'hpp';

import { swagger } from '@common/config';
import { envs } from '@common/config/envs';
import { config } from '@common/constants';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.use(helmet());
  app.use(hpp());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useLogger(app.get(Logger));
  app.flushLogs();
  swagger.setup(app);
  app.setGlobalPrefix(config.PREFIX);

  await app.listen(envs.PORT, async () => {
    Logger.log(`App in: ${await app.getUrl()}`, 'Bootstrap');
  });
}

bootstrap();
