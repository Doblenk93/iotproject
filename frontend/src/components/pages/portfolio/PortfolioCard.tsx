'use client';

import { useState } from 'react';
import { MapPin, Calendar, Play, Zap } from 'lucide-react';
import { Portfolio, getPortfolioDateRange } from '@/types/portfolio';
import { isVideo, getMediaThumbnail, getVideoSourceUrl, getMediaAltText } from '@/utils/mediaHandler';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { VideoThumbnailExtractor } from '@/components/VideoThumbnailExtractor';
import { getPortfolioTypeColor } from '@/components/pages/portfolio/portfolioConstants';

interface PortfolioCardProps {
  portfolio: Portfolio;
  onDetailClick: (portfolio: Portfolio) => void;
}

/**
 * Portfolio Card Component
 * Card untuk grid view dengan hover effect
 * - Thumbnail/Preview
 * - Title & Type
 * - Location & Date (hover)
 * - Play button untuk video
 */
export function PortfolioCard({ portfolio, onDetailClick }: PortfolioCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const media = portfolio.Image;
  const isVideoMedia = isVideo(media);
  const videoSrc = isVideoMedia ? getVideoSourceUrl(media) : null;
  const thumbnail = getMediaThumbnail(media);
  const altText = getMediaAltText(media, portfolio.Title);
  const typeColor = getPortfolioTypeColor(portfolio.Type);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onDetailClick(portfolio)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video bg-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-xl border border-slate-100">        {/* Thumbnail/Image */}
        {isVideoMedia && videoSrc ? (
          <VideoThumbnailExtractor
            videoUrl={videoSrc}
            timeOffset={2}
            //alt={altText}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <ImageWithFallback
            src={thumbnail}
            alt={altText}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}

        {/* Video Indicator */}
        {isVideoMedia && (
          <div className="absolute top-3 right-3 w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 z-20 shadow-[0_0_15px_rgba(0,0,0,0.3)]"> 
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
        )}

        {/* Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hover Info - Details */}
        <div
          className={`absolute inset-0 flex flex-col justify-end p-5 transition-all duration-300 ${
            isHovering ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          {portfolio.Location && (
            <div className="flex items-center gap-2 text-sm text-white mb-1.5">
              <MapPin className="w-4 h-4 text-green-400" />
              <span className="font-medium">
                {portfolio.Location.City}, {portfolio.Location.Province}
              </span>
            </div>
          )}

          {portfolio.Timestamp && (
            <div className="flex items-center gap-2 text-xs text-slate-200">
              <Calendar className="w-4 h-4 text-green-400" />
              <span>{getPortfolioDateRange(portfolio.Timestamp)}</span>
            </div>
          )}
          
          <div className="mt-3 pt-3 border-t border-white/20 text-sm font-bold text-green-400 tracking-tight">
            Lihat Detail →
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="mt-4 px-1">
        <h3 className="text-slate-800 font-bold text-lg group-hover:text-green-600 transition-colors line-clamp-1 min-h-[2.5rem] leading-snug">
          {portfolio.Title}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <span className={`px-3 py-1 rounded-md text-[12px] font-bold tracking-wide ${typeColor}`}>
            {portfolio.Type}
          </span>

          {/* Featured Indicator kecil di samping */}
          {portfolio.isFeatured && (
            <div className="flex items-center gap-1 text-[12px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100 tracking-tighter animate-pulse">
              <Zap className="w-3 h-3 fill-amber-600" />
              Featured
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
