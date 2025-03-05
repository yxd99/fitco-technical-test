import { MyListVideos } from '@app/components/videos/my-list-videos.component';

export default function MyVideos() {
  return (
    <div className="flex size-full flex-col">
      <div className="flex size-full flex-col">
        <MyListVideos />
      </div>
    </div>
  );
}
