import {
  Injectable,
  Logger,
  HttpStatus,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CloudinaryService } from '@shared/cloudinary/cloudinary.service';

import { TYPE_PRIVACY } from './constants';
import { CreateVideoDto } from './dto/create-video.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  private readonly logger = new Logger(VideosService.name);

  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    try {
      const { video, ...data } = createVideoDto;
      const { secure_url: url, public_id: publicId } =
        await this.cloudinaryService.uploadFile(video);

      return this.videoRepository.save({
        ...data,
        url,
        publicId,
      });
    } catch (error) {
      this.logger.error(`Error creating video: ${error.message}`);
      throw new HttpException('Error creating video', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(
    isAuthenticated: boolean,
    query?: QueryParamsDto,
  ): Promise<Video[]> {
    const { page = 1, size = 10, search = '', user = '' } = query;
    const offset = (page - 1) * size;
    let privacyQuery = '';
    const privacy = !isAuthenticated
      ? TYPE_PRIVACY.PUBLIC
      : (query.privacy ?? '');

    if (privacy === TYPE_PRIVACY.PRIVATE && !isAuthenticated) {
      throw new UnauthorizedException(
        'You must be logged in to view private videos.',
      );
    }

    const queryBuilder: string[] = [];

    if (privacy) {
      privacyQuery = 'privacy = :privacy';
    }

    if (search) {
      queryBuilder.push(`(videos.title LIKE :query 
                            OR videos.description LIKE :query)`);
    }

    if (user) {
      queryBuilder.push(`(users.username LIKE :user
                            OR users.email LIKE :user)`);
    }

    const finalQuery = `${queryBuilder.join(' OR ')} ${queryBuilder.length > 0 ? 'AND' : ''} ${privacyQuery}`;

    return this.videoRepository
      .createQueryBuilder('videos')
      .innerJoinAndSelect('videos.user', 'users')
      .where(finalQuery, {
        query: `%${search}%`,
        user: `%${user}%`,
        privacy,
      })
      .limit(size)
      .offset(offset)
      .orderBy('videos.createdAt', 'DESC')
      .getMany();
  }

  async findOne(id: number): Promise<Video> {
    const video = await this.videoRepository.findOne({
      relations: ['user', 'comments', 'comments.user'],
      where: { id },
    });
    if (video === null) {
      throw new NotFoundException('Video not found');
    }
    return video;
  }
}
