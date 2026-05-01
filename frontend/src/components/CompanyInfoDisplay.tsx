'use client';

/**
 * Contoh Komponen: Company Info dari Strapi
 * Implementasi di server-side bisa langsung di page.tsx
 */

import { useState } from 'react';
import Image from 'next/image';
import { CompanyInfo } from '@/types/strapi';
import { getStrapiImageUrl } from '@/services/strapiService';

interface CompanyInfoDisplayProps {
  data: CompanyInfo | null;
  loading?: boolean;
  error?: Error | null;
}

export function CompanyInfoDisplay({ data, loading, error }: CompanyInfoDisplayProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin">Loading...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-10 text-red-600">
        Error loading company information
      </div>
    );
  }

  const { attributes } = data;
  const logoUrl = attributes.logo?.data
    ? getStrapiImageUrl(attributes.logo.data.attributes.url)
    : null;

  return (
    <div className="space-y-8">
      {/* Logo Section */}
      {logoUrl && (
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <Image
              src={logoUrl}
              alt={attributes.companyName}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      {/* Company Info */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-center">{attributes.companyName}</h1>
        
        <p className="text-lg text-gray-600 text-center leading-relaxed">
          {attributes.description}
        </p>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">{attributes.email}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-lg font-semibold">{attributes.phone}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg col-span-1 md:col-span-2">
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-lg font-semibold">{attributes.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
