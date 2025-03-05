'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useVideos } from '@app/hooks/use-videos';
import { useAuthStore } from '@app/lib/store';

import { LoginRegister } from '../login-register';
import { SearchBar } from '../search-bar';

import { VideoCard } from './video-card.component';
import { VideoUploadModal } from './video-upload-modal';

export function ListVideos() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated } = useAuthStore();
  const { videos, isFetching, handleChangeInView } = useVideos({
    search: searchTerm,
    page: 1,
  });

  const { ref } = useInView({ threshold: 0.3, onChange: handleChangeInView });

  return (
    <>
      <div className="sticky top-0 z-50 flex size-full gap-2 border-b border-gray-200 bg-white p-3">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {isAuthenticated ? <VideoUploadModal /> : null}
        {!isAuthenticated && <LoginRegister />}
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 xl:grid-cols-3">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            ref={videos.length === index + 1 ? ref : undefined}
            video={video}
          />
        ))}
        {videos.length === 0 && !isFetching && <>No videos found</>}
        {isFetching ? <>Loading...</> : null}
      </div>
    </>
  );
}
