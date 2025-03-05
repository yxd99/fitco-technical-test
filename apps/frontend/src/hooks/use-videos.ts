'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { type GetVideos } from '@app/interfaces/video.interface';
import {
  getInfiniteVideosQuery,
} from '@app/queries/video-query';

export const useVideos = (params: GetVideos) => {
  const query = useInfiniteQuery({
    ...getInfiniteVideosQuery(params),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
  });

  const videos = query.data?.pages.flatMap((page) => page) ?? [];

  const handleChangeInView = (inView: boolean) => {
    if (inView && query.hasNextPage) void query.fetchNextPage();
  };

  return {
    ...query,
    videos,
    handleChangeInView,
  };
};
