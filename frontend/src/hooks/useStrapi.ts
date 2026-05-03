'use client';

/**
 * Custom Hook untuk Strapi Data Fetching
 */

import { useState, useEffect, useCallback } from 'react';

interface UseStrapiFetchOptions {
  skip?: boolean;
  onError?: (error: Error) => void;
  onSuccess?: (data: unknown) => void;
}

interface UseStrapiFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook untuk fetch data dari Strapi
 * Gunakan ini untuk client-side data fetching yang memerlukan reactivity
 */
export function useStrapiData<T>(
  url: string,
  options: UseStrapiFetchOptions = {}
): UseStrapiFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!options.skip);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (options.skip) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
      const response = await fetch(`${strapiUrl}/api${url}`, {
        cache: 'no-store', // Disable browser cache untuk client-side fetching
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result.data);
      options.onSuccess?.(result.data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [url, options.skip, options.onError, options.onSuccess]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Custom hook untuk infinite scroll pagination
 */
interface UseStrapiPaginationOptions extends UseStrapiFetchOptions {
  pageSize?: number;
}

interface UseStrapiPaginationResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useStrapiPagination<T>(
  endpoint: string,
  options: UseStrapiPaginationOptions = {}
): UseStrapiPaginationResult<T> {
  const pageSize = options.pageSize || 10;
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = useCallback(
    async (pageNum: number) => {
      try {
        setLoading(true);
        setError(null);

        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
        const query = `${endpoint}?pagination[page]=${pageNum}&pagination[pageSize]=${pageSize}&populate=*`;
        const response = await fetch(`${strapiUrl}/api${query}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
        }

        const result = await response.json();
        const newData = result.data || [];

        if (pageNum === 1) {
          setData(newData);
        } else {
          setData(prev => [...prev, ...newData]);
        }

        const total = result.meta?.pagination?.total || 0;
        const currentTotal = pageNum * pageSize;
        setHasMore(currentTotal < total);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        options.onError?.(error);
      } finally {
        setLoading(false);
      }
    },
    [endpoint, pageSize, options.onError]
  );

  const loadMore = useCallback(async () => {
    const nextPage = page + 1;
    await fetchPage(nextPage);
    setPage(nextPage);
  }, [page, fetchPage]);

  const refetch = useCallback(async () => {
    setPage(1);
    await fetchPage(1);
  }, [fetchPage]);

  useEffect(() => {
    if (!options.skip) {
      fetchPage(1);
    }
  }, []);

  return { data, loading, error, hasMore, loadMore, refetch };
}
