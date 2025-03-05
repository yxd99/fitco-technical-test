'use client';

import { useInView } from 'react-intersection-observer';

import { useGetMyVideos } from '@app/hooks/use-profile';

import { VideoCard } from './video-card.component';
import { VideoUploadModal } from './video-upload-modal';

export function MyListVideos() {
  const { videos, isFetching, handleChangeInView } = useGetMyVideos({});
  const { ref } = useInView({ threshold: 0.3, onChange: handleChangeInView });

  return (
    <>
      <div className="sticky top-0 z-50 flex size-full justify-end gap-2 border-b border-gray-200 bg-white p-3">
        <VideoUploadModal />
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 xl:grid-cols-3">
        {videos.map((video, index) => (
          <VideoCard
            key={video.video_id}
            ref={videos.length === index + 1 ? ref : undefined}
            video={{
              createdAt: new Date(video.video_createdAt),
              description: video.video_description,
              id: video.video_id,
              privacy: video.video_privacy,
              publicId: video.video_publicId,
              title: video.video_title,
              url: video.video_url,
              user: {
                email: video.video_user_id,
                id: video.video_user_id,
                username: video.video_user_id,
              },
              credits: '',
            }}
          />
        ))}
        {videos.length === 0 && !isFetching && <>No videos found</>}
        {isFetching ? <>Loading...</> : null}
      </div>
    </>
  );
}
