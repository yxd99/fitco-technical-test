import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { MAX_LENGTH_VIDEO_TITLE, TYPE_PRIVACY } from '@api/videos/constants';

export class QueryParamsDto {
  @IsOptional()
  @IsString()
  @MaxLength(MAX_LENGTH_VIDEO_TITLE)
  @ApiProperty({ required: false })
  search: string;

  @IsOptional()
  @IsEnum(TYPE_PRIVACY)
  @ApiProperty({ enum: TYPE_PRIVACY, required: false })
  privacy: TYPE_PRIVACY;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  user?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ required: false, default: 1 })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  @ApiProperty({ required: false, default: 10 })
  size?: number;
}
