import { createCommentVideo } from '@app/services/comment.service';
import { type CreateComment } from '@app/services/interfaces/comments.interface';

export const createCommentAction = (params: CreateComment) => {
  return createCommentVideo(params);
};
