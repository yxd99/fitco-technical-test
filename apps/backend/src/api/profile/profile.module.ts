import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideosModule } from '@api/videos/videos.module';

import { User } from './entities/user.entity';
import { UsersController } from './profile.controller';
import { UsersService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), VideosModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
