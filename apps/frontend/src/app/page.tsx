import { ListVideos } from '@app/components/videos/list-videos.component';

export default function Home() {
  return (
    <div className="flex size-full flex-col">
      <div className="flex size-full flex-col">
        <ListVideos />
      </div>
    </div>
  );
}
