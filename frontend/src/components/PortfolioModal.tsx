'use client';

import { useState, useEffect } from 'react';
import { X, Play, MapPin, Calendar, FileText } from 'lucide-react';
import { Portfolio, BlockEditorContent, getPortfolioDateRange } from '@/types/portfolio';
import { isVideo, getVideoSourceUrl, getMediaThumbnail, getMediaAltText, getMediaDisplayUrl } from '@/utils/mediaHandler';
import { ImageWithFallback } from '@/components/ImageWithFallback';

interface PortfolioModalProps {
  portfolio: Portfolio | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Rich Text Block Renderer
 * Menampilkan Strapi Block Editor content dengan styling
 */
function RichTextRenderer({ content }: { content: BlockEditorContent }) {
  if (!content || !Array.isArray(content)) {
    return <p className="text-slate-500 italic">Tidak ada deskripsi tersedia</p>;
  }

  return (
    <div className="prose prose-slate max-w-none space-y-4">
      {content.map((block, idx) => {
        const text = block.children?.map(child => child.text).join('') || '';

        switch (block.type) {
          case 'heading':
            const level = block.level || 2;
            const HeadingTag = `h${level}` as any;
            const headingClasses = {
              1: 'text-3xl font-bold text-slate-900',
              2: 'text-2xl font-bold text-slate-800',
              3: 'text-xl font-semibold text-slate-800',
              4: 'text-lg font-semibold text-slate-800',
              5: 'text-base font-semibold text-slate-800',
              6: 'text-sm font-semibold text-slate-800',
            };

            return (
              <HeadingTag key={idx} className={`${headingClasses[level as keyof typeof headingClasses]} mt-8 mb-4 first:mt-0`}>
                {text}
              </HeadingTag>
            );

          case 'paragraph':
            return (
              <p key={idx} className="text-slate-600 leading-relaxed">
                {block.children?.map((child, childIdx) => {
                  let content: React.ReactNode = child.text;
                  if (child.bold) content = <strong className="text-slate-900 font-bold">{content}</strong>;
                  if (child.italic) content = <em className="italic">{content}</em>;
                  if (child.code) content = <code className="bg-slate-100 text-green-700 px-1.5 py-0.5 rounded text-sm font-mono">{content}</code>;
                  return <span key={childIdx}>{content}</span>;
                })}
              </p>
            );

          case 'quote':
            return (
              <blockquote key={idx} className="border-l-4 border-green-500 pl-4 py-2 italic text-slate-700 bg-slate-50 rounded-r-lg">
                {text}
              </blockquote>
            );

          case 'code':
            return (
              <pre key={idx} className="bg-slate-900 p-4 rounded-xl overflow-auto shadow-inner">
                <code className="text-sm text-slate-100 font-mono">{text}</code>
              </pre>
            );

          case 'list':
            return (
              <ul key={idx} className="list-disc list-inside text-slate-600 space-y-2 ml-2">
                <li>{text}</li>
              </ul>
            );

          default:
            return <p key={idx} className="text-slate-600">{text}</p>;
        }
      })}
    </div>
  );
}

/**
 * Video Player Component
 * Dengan play button overlay saat thumbnail view
 */
function MediaViewer({ portfolio }: { portfolio: Portfolio }) {
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
              <video
                //src={thumbnail + '?t=0.1'}
                //alt={altText}
                className="w-full h-full object-cover"
                preload='metadata'
              >
                <source src={videoSrc + '?t=0.1'}/>
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

/**
 * Portfolio Modal
 * 2-level details: 
 * - Summary (judul, tipe, lokasi, tanggal)
 * - Full rich text description
 * - Image/Video viewer
 */
export function PortfolioModal({ portfolio, isOpen, onClose }: PortfolioModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  if (!isOpen || !portfolio) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header dengan Close Button */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-5 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 pr-8 line-clamp-1">
            {portfolio.Title}
          </h2>
          <button
            onClick={handleClose}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(92vh-80px)] p-6 md:p-8 [scrollbar-width:thin] scrollbar-thumb-slate-200">
          
          {/* Media Player Container */}
          <div className="mb-8 rounded-xl overflow-hidden bg-slate-100 shadow-inner">
            <MediaViewer portfolio={portfolio} />
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            {/* Category */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Kategori</p>
                <p className="text-slate-800 font-bold">{portfolio.Type}</p>
              </div>
            </div>

            {/* Location */}
            {portfolio.Location && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Lokasi</p>
                  <p className="text-slate-800 font-bold">{portfolio.Location.City}, {portfolio.Location.Province}</p>
                </div>
              </div>
            )}

            {/* Duration */}
            {portfolio.Timestamp && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Periode</p>
                  <p className="text-slate-800 font-bold">{getPortfolioDateRange(portfolio.Timestamp)}</p>
                </div>
              </div>
            )}

            {/* Status */}
            {portfolio.Timestamp?.isCurrentProject && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="w-5 h-5 bg-green-600 rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Status</p>
                  <p className="text-slate-800 font-bold">Dalam Proses</p>
                </div>
              </div>
            )}
          </div>

          {/* Project Details Section */}
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
               <div className="h-6 w-1 bg-green-500 rounded-full" />
               <h3 className="text-lg font-bold text-slate-900">Tentang Projek</h3>
            </div>
            <RichTextRenderer content={portfolio.Description} />
          </div>
        </div>
      </div>
    </div>
  );
}
