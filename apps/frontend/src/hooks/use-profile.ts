import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyVideosQuery } from '@app/queries/profile-query';

export const useGetMyVideos = (filters: object) => {
  const query = useInfiniteQuery({
    ...getMyVideosQuery(filters),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  const videos = query.data?.pages.flatMap((page) => page) ?? [];

  const handleChangeInView = (inView: boolean): void => {
    if (inView && query.hasNextPage) void query.fetchNextPage();
  };

  return {
    ...query,
    handleChangeInView,
    videos,
  };
};
