'use client';

import { useState, useEffect, useCallback } from 'react';
import { Filter } from 'lucide-react';
import { Portfolio } from '@/types/portfolio';
import { getPortfolioList, getPortfolioByType } from '@/services/strapiService';
import { PortfolioCard } from '@/components/pages/portfolio/PortfolioCard';
import { PortfolioModal } from '@/components/pages/portfolio/PortfolioModal';
import { PortfolioSkeleton } from '@/components/pages/portfolio/PortfolioSkeleton';
import type { PortfolioListResponse } from '@/types/portfolio';

const FILTERS = ['All', 'Environmental', 'Electrical'];
const PAGE_SIZE = 6;

/**
 * Portfolio Grid Component
 * Main component untuk portfolio page:
 * - Filter by type
 * - Pagination
 * - Modal untuk detail view
 * - Loading states
 */
export function PortfolioGrid() {
  // State management
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  
  const fetchPortfolios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let response: PortfolioListResponse;

      // Pastikan fungsi getPortfolioByType juga mendukung sorting yang sama
      if (activeFilter === 'All') {
        response = await getPortfolioList({
          page: currentPage,
          pageSize: PAGE_SIZE,
          includeDescription: true,
        });
      } else {
        response = await getPortfolioByType(
          activeFilter as 'Environmental' | 'Electrical',
          currentPage,
          PAGE_SIZE
        );
      }

      setPortfolios(response?.data || []);
      console.log('Fetched portfolios:', response?.data);
      setTotalPages(response?.meta?.pagination?.pageCount || 1);
    } catch (err) {
      console.error('Failed to fetch portfolios:', err);
      setError('Failed to load portfolios. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [activeFilter, currentPage]);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  function handleFilterChange(filter: string) {
    if (filter === activeFilter) return;
    setActiveFilter(filter);
    setCurrentPage(1); // Reset ke halaman 1 saat filter berubah
  }

  function handlePortfolioClick(portfolio: Portfolio) {
    setSelectedPortfolio(portfolio);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPortfolio(null), 300); // Delay untuk smooth close animation
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter & Count Header - Menggunakan Grid agar tinggi konsisten */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end min-h-[100px]">
            
            {/* Sisi Kiri: Filter Buttons */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-slate-400" />
                <span className="font-bold text-slate-800 tracking-wider text-md">
                  Kategori
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm ${
                      activeFilter === filter
                        ? 'bg-green-600 text-white shadow-green-200'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Sisi Kanan: Result Count - Diposisikan agar tidak mendorong konten bawah */}
            <div className="md:text-right">
              {/* Container ini tetap ada di DOM, hanya isinya yang berubah/transparan */}
              <div className={`transition-opacity duration-300 ${activeFilter !== 'All' && !loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <p className="text-sm font-medium text-slate-500 bg-slate-100 inline-block px-4 py-2 rounded-full">
                  Menampilkan <span className="text-green-600 font-bold">{portfolios.length}</span> dari kategori {activeFilter}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-red-700 font-medium text-sm">{error}</p>
          </div>
        )}

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 min-h-[520px] transition-all duration-300">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <PortfolioSkeleton key={i} />
            ))
          ) : portfolios.length > 0 ? (
            portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                onDetailClick={handlePortfolioClick}
              />
            ))
          ) : (
            // Empty State
            <div className="col-span-full flex items-center justify-center py-20 transition-opacity duration-300 opacity-100">
              <p className="text-slate-700 text-lg italic">
                Tidak ada portofolio yang ditemukan untuk filter <span className="font-semibold">&quot;{activeFilter}&quot;</span>.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className={`transition-opacity duration-300 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {totalPages > 1 && (
           <div className="flex items-center justify-center gap-3 pt-8 border-t border-slate-200">
             <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Prev
              </button>

            {/* Page indicators */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // Show first, last, current, and adjacent pages
                  const distance = Math.abs(page - currentPage);
                  return page === 1 || page === totalPages || distance <= 1;
                })
                .map((page, idx, arr) => {
                  // Add ellipsis if there's a gap
                  if (idx > 0 && arr[idx - 1] !== page - 1) {
                    return (
                      <span key={`ellipsis-${page}`} className="px-2 text-slate-500">
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
            </div>

            {/* Next button */}
            <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
           </div>
          )}
        </div>
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal
        portfolio={selectedPortfolio}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
