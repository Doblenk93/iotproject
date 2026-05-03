'use client';

import { X, MapPin, Calendar, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Portfolio, getPortfolioDateRange } from '@/types/portfolio';
import { PortfolioMediaViewer } from '@/components/pages/portfolio/PortfolioMediaViewer';
import { RichTextRenderer } from '@/components/pages/portfolio/RichTextRenderer';
import { getPortfolioDetail } from '@/services/strapiService';
import { getMediaThumbnail } from '@/utils/mediaHandler';

interface PortfolioModalProps {
  portfolio: Portfolio | null;
  isOpen: boolean;
  onClose: () => void;
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
  const [selectedMedia, setSelectedMedia] = useState<Portfolio['Image'] | null>(portfolio?.Image ?? null);
  const [detailPortfolio, setDetailPortfolio] = useState<Portfolio | null>(null);
  const [isLoadingExtras, setIsLoadingExtras] = useState(false);

  useEffect(() => {
    if (portfolio) {
      setSelectedMedia(portfolio.Image);
      setDetailPortfolio(null);
    }
  }, [portfolio]);

  useEffect(() => {
    if (!isOpen || !portfolio) {
      return;
    }

    let mounted = true;
    setIsLoadingExtras(true);
    setDetailPortfolio(null);

    getPortfolioDetail(portfolio.documentId)
      .then((result) => {
        if (!mounted) return;
        const data = result?.data;
        if (data) {
          setDetailPortfolio(data);
          if (!selectedMedia) {
            setSelectedMedia(data.Image);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch portfolio detail:', err);
      })
      .finally(() => {
        if (mounted) setIsLoadingExtras(false);
      });

    return () => {
      mounted = false;
    };
  }, [isOpen, portfolio]);

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

  if (!isOpen || !portfolio) return null;

  const activePortfolio = detailPortfolio ?? portfolio;
  const additionalImages = activePortfolio.OtherImages ?? [];

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
            {selectedMedia ? (
              <PortfolioMediaViewer media={selectedMedia} />
            ) : null}
          </div>

          {(activePortfolio.MultipleMedia && ((additionalImages.length ?? 0) > 0 || isLoadingExtras)) && (
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-[0.2em]">Galeri Tambahan</h4>
                {isLoadingExtras && (
                  <span className="text-xs text-slate-500">Memuat gambar tambahan...</span>
                )}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {[activePortfolio.Image, ...additionalImages].map((media, index) => {
                  const thumb = getMediaThumbnail(media);
                  const isActive = selectedMedia?.url === media.url;

                  return (
                    <button
                      key={`${media.id}-${index}`}
                      type="button"
                      onClick={() => setSelectedMedia(media)}
                      className={`overflow-hidden rounded-2xl border transition-all ${
                        isActive ? 'border-green-600 shadow-sm' : 'border-slate-200'
                      }`}
                    >
                      <img
                        src={thumb}
                        alt={media.alternativeText || media.name || portfolio.Title}
                        className="w-full h-24 object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
