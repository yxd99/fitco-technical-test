import {
  type GetVideos,
  type UploadVideo,
} from '@app/interfaces/video.interface';
import { httpClient } from '@app/lib/http';

import { type VideoResponse } from './interfaces/video.interface';

export const getVideosService = async (params: GetVideos) => {
  const { page = 1, ...rest } = params;

  const { data } = await httpClient.get<VideoResponse[]>(`/videos`, {
    ...rest,
    page,
  });
  return data;
};

export const getVideoService = async (id: string) => {
  const { data } = await httpClient.get<VideoResponse>(`/videos/${id}`);
  return data;
};

export const uploadVideoService = async (params: UploadVideo) => {
  const { data } = await httpClient.formData<VideoResponse>(
    '/videos',
    params.formData
  );
  return data;
};
