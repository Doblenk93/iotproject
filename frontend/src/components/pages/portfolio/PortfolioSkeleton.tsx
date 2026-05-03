'use client';

export function PortfolioSkeleton() {
  return (
    <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm animate-pulse">
      <div className="relative w-full aspect-video overflow-hidden rounded-[1.5rem] bg-slate-100" />
      <div className="h-5 bg-slate-200 rounded-full h-min-[2rem] w-3/4" />
      <div className="h-4 bg-slate-200 rounded-full w-1/3" />
    </div>
  );
}
