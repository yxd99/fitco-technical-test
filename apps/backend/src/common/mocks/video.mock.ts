import { TYPE_PRIVACY } from '@api/videos/constants';
import { Video } from '@api/videos/entities/video.entity';

import { userMock } from './user.mock';

export const videoMock: Video = {
  createdAt: new Date(),
  credits: '',
  description: '',
  id: 1,
  privacy: TYPE_PRIVACY.PUBLIC,
  publicId: '1',
  removedAt: new Date(),
  title: '',
  url: '',
  user: userMock,
};
