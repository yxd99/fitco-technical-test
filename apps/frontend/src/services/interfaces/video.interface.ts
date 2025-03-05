import { type User } from './profile.interface';

export interface VideoResponse {
  title: string;
  description: string;
  url: string;
  credits: string;
  id: string;
  privacy: string;
  publicId: string;
  createdAt: Date;
  user: User;
  comments?: VideoComments[];
}

export interface VideoComments {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
