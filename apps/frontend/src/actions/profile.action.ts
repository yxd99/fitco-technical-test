import { getMyVideosService } from '@app/services/profile.service';

export const getMyVideosAction = (params: { page: number }) => {
  return getMyVideosService(params);
};
