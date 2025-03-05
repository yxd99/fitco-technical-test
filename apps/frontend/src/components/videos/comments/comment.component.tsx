import { formatDistanceToNow } from 'date-fns';

import { cn } from '@app/lib/utils';
import { type VideoComments } from '@app/services/interfaces/video.interface';

interface CommentProps {
  comment: VideoComments;
  className?: string;
}

export function Comment({ comment, className }: CommentProps) {
  return (
    <div
      key={comment.id}
      className={cn('flex gap-1 border-1 p-3 rounded-sm', className)}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{comment.user.username}</span>
          <span className="text-xs">
            {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
          </span>
        </div>
        <p className="mt-1 text-sm">{comment.text}</p>
      </div>
    </div>
  );
}
