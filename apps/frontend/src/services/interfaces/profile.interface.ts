export interface VideosByMeResponse {
  video_id: string;
  video_title: string;
  video_description: string;
  video_url: string;
  video_privacy: string;
  video_publicId: string;
  video_credits: string;
  video_createdAt: Date;
  video_user_id: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}
