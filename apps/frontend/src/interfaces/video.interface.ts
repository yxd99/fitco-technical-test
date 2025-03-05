export interface GetVideos {
  page?: number;
  search?: string;
  user?: string;
}

export interface UploadVideo {
  formData: FormData;
}
