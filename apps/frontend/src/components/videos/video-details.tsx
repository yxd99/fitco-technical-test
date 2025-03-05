'use client';

import { useParams } from 'next/navigation';

import { useVideo } from '@app/hooks/use-videos';

import { CommentsSection } from './comments-section.component';
import { VideoInfo } from './video-info.component';

export function VideoDetails() {
  const { id } = useParams();
  const { data: video, isFetching } = useVideo(id as string);

  return (
    <>
      {isFetching ? <>Loading</> : null}
      {video ? (
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <div className="aspect-video overflow-hidden rounded-lg bg-black">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption -- we want to show the video preview */}
                <video
                  controls
                  className="size-full object-cover"
                  src={video.url}
                />
              </div>

              <VideoInfo video={video} />
            </div>

            <div className="lg:col-span-1">
              <CommentsSection
                comments={video.comments ?? []}
                videoId={video.id}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
