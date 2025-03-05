import * as z from 'zod';

import {
  MAX_LENGTH_VIDEO_DESCRIPTION,
  MAX_LENGTH_VIDEO_SIZE,
  MAX_LENGTH_VIDEO_TITLE,
  MIN_LENGTH_VIDEO_TITLE,
  TYPE_PRIVACY,
} from '../constants/video-upload';

export const formSchema = z.object({
  title: z
    .string()
    .min(
      MIN_LENGTH_VIDEO_TITLE,
      `Title must be at least ${MIN_LENGTH_VIDEO_TITLE} characters`
    )
    .max(
      MAX_LENGTH_VIDEO_TITLE,
      `Title must be at most ${MAX_LENGTH_VIDEO_TITLE} characters`
    ),
  description: z
    .string()
    .max(
      MAX_LENGTH_VIDEO_DESCRIPTION,
      `Description must be at most ${MAX_LENGTH_VIDEO_DESCRIPTION} characters`
    )
    .optional(),
  privacy: z.nativeEnum(TYPE_PRIVACY).default(TYPE_PRIVACY.PUBLIC),
  video: z
    .instanceof(File, { message: 'Please upload a video file' })
    .refine((file) => file.size <= MAX_LENGTH_VIDEO_SIZE, {
      message: 'Video file size must be less than 20GB',
    })
    .refine((file) => file.type.startsWith('video/'), {
      message: 'Video file must be a video file',
    }),
});

export type FormValues = z.infer<typeof formSchema>;
