import { formatDistanceToNow } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

import { AspectRatio } from '@app/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@app/components/ui/card';
import { type VideoResponse } from '@app/services/interfaces/video.interface';

interface VideoCardProps {
  video: VideoResponse;
  ref?: React.Ref<HTMLDivElement>;
}

export const VideoCard = memo(({ video, ref }: VideoCardProps) => {
  const timeAgo = formatDistanceToNow(video.createdAt, { addSuffix: true });

  return (
    <Card ref={ref} className="gap-1 overflow-hidden">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption -- we want to show the video preview */}
          <video controls className="size-full object-cover" src={video.url} />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-1">
            <div>
              <h3 className="font-semibold leading-none">{video.title}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm">
                <span>{video.user.username}</span>
                <span>•</span>
                <span>{timeAgo}</span>
                {video.privacy !== 'public' && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{video.privacy}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {video.description ? (
          <p className="mt-3 line-clamp-2 text-sm">{video.description}</p>
        ) : null}
      </CardContent>
      <CardFooter className="flex justify-end p-4 pt-0">
        <Link href={`/videos/${video.id}`}>
          <ArrowRight className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  );
});

VideoCard.displayName = 'VideoCard';
