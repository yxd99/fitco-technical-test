'use client';

import { useState } from 'react';

import { Button } from '@app/components/ui/button';
import { Textarea } from '@app/components/ui/textarea';
import { useCreateComment } from '@app/hooks/use-comments';
import { type VideoComments } from '@app/services/interfaces/video.interface';

import { Comment } from './comments/comment.component';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

interface CommentsSectionProps {
  comments: VideoComments[];
  videoId: string;
}

export function CommentsSection({ comments, videoId }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState('');

  const { mutate: createComment } = useCreateComment();

  const handleCreateComment = () => {
    createComment({
      comment: newComment,
      videoId: String(videoId),
    });
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Comments</h2>

      <div className="flex gap-3">
        <div className="flex-1 space-y-2">
          <Textarea
            className="resize-none"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end">
            <Button disabled={!newComment.trim()} onClick={handleCreateComment}>
              Comment
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {[...comments]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
}
