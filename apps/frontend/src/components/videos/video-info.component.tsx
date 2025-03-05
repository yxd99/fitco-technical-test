import { formatDistanceToNow } from 'date-fns';

import { Separator } from '@app/components/ui/separator';
import { type VideoResponse } from '@app/services/interfaces/video.interface';

interface VideoInfoProps {
  video: VideoResponse;
}

export function VideoInfo({ video }: VideoInfoProps) {
  const timeAgo = formatDistanceToNow(video.createdAt, { addSuffix: true });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{video.title}</h1>

      <div className="flex items-center gap-3">
        <div>
          <h3 className="font-medium">{video.user.username}</h3>
          <p className="text-sm">{timeAgo}</p>
        </div>
      </div>

      <Separator />

      <div className="rounded-lg p-3">
        <p className="text-sm">{video.description}</p>
      </div>
    </div>
  );
}
