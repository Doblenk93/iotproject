'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import type { Portfolio } from '@/types/portfolio';
import { isVideo, getVideoSourceUrl, getMediaThumbnail, getMediaDisplayUrl, getMediaAltText } from '@/utils/mediaHandler';
import { ImageWithFallback } from '@/components/ImageWithFallback';

interface PortfolioMediaViewerProps {
  portfolio: Portfolio;
}

export function PortfolioMediaViewer({ portfolio }: PortfolioMediaViewerProps) {
  const [showVideo, setShowVideo] = useState(false);
  const media = portfolio.Image;
  const isVideoMedia = isVideo(media);
  const videoSrc = getVideoSourceUrl(media);
  const thumbnail = getMediaThumbnail(media);
  const displayImage = getMediaDisplayUrl(media);
  const altText = getMediaAltText(media, portfolio.Title);

  if (!isVideoMedia && showVideo) {
    setShowVideo(false);
  }

  return (
    <div className="relative w-full aspect-video bg-slate-800 rounded-lg overflow-hidden">
      {isVideoMedia ? (
        <>
          {!showVideo ? (
            <>
              <video className="w-full h-full object-cover" preload="metadata">
                <source src={`${videoSrc}?t=0.1`} />
              </video>

              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </button>
            </>
          ) : (
            <video
              src={videoSrc}
              poster={thumbnail}
              controls
              autoPlay
              className="w-full h-full"
            />
          )}
        </>
      ) : (
        <ImageWithFallback
          src={displayImage}
          alt={altText}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
