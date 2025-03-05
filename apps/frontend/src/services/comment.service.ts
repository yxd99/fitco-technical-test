import { httpClient } from '@app/lib/http';

import { type CreateComment } from './interfaces/comments.interface';

export const createCommentVideo = ({ videoId, comment }: CreateComment) => {
  return httpClient.post<unknown, unknown>(`/${videoId}`, { comment });
};
