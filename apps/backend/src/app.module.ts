import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AuthModule } from '@api/auth/auth.module';
import { UsersModule } from '@api/profile/profile.module';
import { typeorm } from '@common/config';
import { ErrorHandlerModule } from '@common/error-handler/error-handler.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeorm.config()),
    AuthModule,
    UsersModule,
    ErrorHandlerModule,
  ],
  providers: [Logger],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
