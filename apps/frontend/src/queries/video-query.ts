import { getVideoAction, getVideosAction } from '@app/actions/videos.action';
import { type GetVideos } from '@app/interfaces/video.interface';

export const getInfiniteVideosQuery = (params: GetVideos) => ({
  initialPageParam: 1,
  queryKey: ['videos', params],
  queryFn: async ({ pageParam = 1 }) => {
    const videos = await getVideosAction({ ...params, page: pageParam });
    return videos;
  },
});
