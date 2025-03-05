import {
  type GetVideos,
  type UploadVideo,
} from '@app/interfaces/video.interface';
import {
  getVideoService,
  getVideosService,
  uploadVideoService,
} from '@app/services/video.service';

export const getVideosAction = async (params: GetVideos) => {
  const { page = 1, ...rest } = params;

  return getVideosService({ ...rest, page });
};

export const getVideoAction = (id: string) => getVideoService(id);

export const uploadVideoAction = async (params: UploadVideo) => {
  return uploadVideoService(params);
};
