import { httpClient } from '@app/lib/http';

import { type VideosByMeResponse } from './interfaces/profile.interface';

export const getMyVideosService = async (params: { page: number }) => {
  const { data } = await httpClient.get<VideosByMeResponse[]>(
    `/profile/videos`,
    params
  );
  return data;
};
