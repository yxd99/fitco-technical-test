'use client';

import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { uploadVideoAction } from '@app/actions/videos.action';
import { type GetVideos } from '@app/interfaces/video.interface';
import {
  getInfiniteVideosQuery,
  getVideoQuery,
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

export const useVideo = (id: string) =>
  useQuery({
    ...getVideoQuery(id),
  });

export const useUploadVideo = () => {
  return useMutation({
    mutationFn: uploadVideoAction,
    onSuccess: () => {
      toast.success('Video uploaded successfully');
    },
    onError: () => {
      toast.error('Error uploading video');
    },
  });
};
