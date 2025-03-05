import { getMyVideosAction } from '@app/actions/profile.action';

export const getMyVideosQuery = (params: object) => ({
  initialPageParam: 1,
  queryKey: ['my-videos', params],
  queryFn: async ({ pageParam = 1 }) => {
    const videos = await getMyVideosAction({ ...params, page: pageParam });
    return videos;
  },
});
