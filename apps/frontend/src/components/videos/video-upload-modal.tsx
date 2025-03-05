'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@app/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@app/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@app/components/ui/form';
import { Input } from '@app/components/ui/input';
import { Label } from '@app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/ui/select';
import { Textarea } from '@app/components/ui/textarea';
import { useUploadVideo } from '@app/hooks/use-videos';

import {
  MAX_LENGTH_VIDEO_DESCRIPTION,
  MAX_LENGTH_VIDEO_SIZE,
  MAX_LENGTH_VIDEO_TITLE,
  MIN_LENGTH_VIDEO_TITLE,
  TYPE_PRIVACY,
} from './constants/video-upload';
import { type FormValues, formSchema } from './schemas/video-upload.schema';

export function VideoUploadModal() {
  const { mutate: uploadVideo, isPending, isError } = useUploadVideo();
  const [open, setOpen] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      privacy: TYPE_PRIVACY.PUBLIC,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue('video', file);

      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
    }
  };

  const clearFileSelection = () => {
    setSelectedFile(null);
    setVideoPreview(null);
    form.resetField('video');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.set('title', values.title);

    if (values.description) {
      formData.set('description', values.description);
    }

    formData.set('privacy', values.privacy);
    formData.set('video', values.video);

    uploadVideo({ formData });

    if (isError) {
      return;
    }

    form.reset();
    clearFileSelection();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Upload size={16} />
          Upload Video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Upload New Video</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="video-upload">Video File</Label>
              <div className="rounded-lg border-2 border-dashed p-4 text-center">
                {!videoPreview ? (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- we want to trigger the click event
                  <div
                    className="flex cursor-pointer flex-col items-center justify-center py-4"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mb-2 size-10" />
                    <p className="text-sm">Click to upload or drag and drop</p>
                    <p className="mt-1 text-xs">
                      MP4, WebM, or MOV (max. {MAX_LENGTH_VIDEO_SIZE}MB)
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption -- we want to show the video preview */}
                    <video
                      controls
                      className="mx-auto max-h-[200px] rounded"
                      src={videoPreview}
                    />
                    <Button
                      className="absolute right-2 top-2 size-8"
                      size="icon"
                      type="button"
                      variant="destructive"
                      onClick={clearFileSelection}
                    >
                      <X className="size-4" />
                    </Button>
                    <p className="mt-2 truncate text-sm">
                      {selectedFile?.name}
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  accept="video/*"
                  className="hidden"
                  id="video-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                {form.formState.errors.video ? (
                  <p className="mt-2 text-sm">
                    {form.formState.errors.video.message}
                  </p>
                ) : null}
              </div>
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter video title"
                      {...field}
                      maxLength={MAX_LENGTH_VIDEO_TITLE}
                      minLength={MIN_LENGTH_VIDEO_TITLE}
                    />
                  </FormControl>
                  <FormDescription>{`${field.value.length}/${MAX_LENGTH_VIDEO_TITLE} characters`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Enter video description (optional)"
                      rows={3}
                      {...field}
                      maxLength={MAX_LENGTH_VIDEO_DESCRIPTION}
                    />
                  </FormControl>
                  <FormDescription>
                    {`${field.value?.length ?? 0}/${MAX_LENGTH_VIDEO_DESCRIPTION} characters`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Privacy</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select privacy setting" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(TYPE_PRIVACY).map((privacy) => (
                        <SelectItem key={privacy} value={privacy}>
                          {privacy}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Who can view your video</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isPending || !selectedFile} type="submit">
                {isPending ? 'Uploading...' : 'Upload Video'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
