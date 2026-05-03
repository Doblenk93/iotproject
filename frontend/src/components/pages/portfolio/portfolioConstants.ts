export const PORTFOLIO_TYPE_COLORS: Record<string, string> = {
  Environmental: 'bg-green-600 text-white',
  Electrical: 'bg-blue-600 text-white',
};

export const DEFAULT_PORTFOLIO_TYPE_COLOR = 'bg-slate-100 text-slate-600 border border-slate-200';

export function getPortfolioTypeColor(type?: string) {
  return PORTFOLIO_TYPE_COLORS[type || ''] || DEFAULT_PORTFOLIO_TYPE_COLOR;
}
