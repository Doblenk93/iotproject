'use client';

/**
 * Contoh Komponen: Services dari Strapi
 */

import Image from 'next/image';
import { Service, StrapiFetchResponse } from '@/types/strapi';
import { getStrapiImageUrl } from '@/services/strapiService';

interface ServicesDisplayProps {
  data: StrapiFetchResponse<Service> | null;
  loading?: boolean;
  error?: Error | null;
}

export function ServicesDisplay({ data, loading, error }: ServicesDisplayProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin">Loading services...</div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="text-center py-10 text-red-600">
        Error loading services
      </div>
    );
  }

  const services = data.data;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Our Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { attributes } = service;
  const imageUrl = attributes.image?.data
    ? getStrapiImageUrl(attributes.image.data.attributes.url)
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={imageUrl}
            alt={attributes.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold">{attributes.title}</h3>

        {attributes.shortDescription && (
          <p className="text-gray-600 text-sm">{attributes.shortDescription}</p>
        )}

        <div
          className="text-gray-700 text-sm prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: attributes.description }}
        />

        {attributes.icon && (
          <div className="text-3xl pt-2">{attributes.icon}</div>
        )}
      </div>
    </div>
  );
}
