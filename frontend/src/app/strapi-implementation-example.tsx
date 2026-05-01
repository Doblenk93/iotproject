/**
 * CONTOH: Profile Page - Server-side rendering dengan Strapi data
 * File: src/app/(profile)/page.tsx
 * 
 * CARA PENGGUNAAN:
 * 1. Copy kode ini ke page.tsx Anda
 * 2. Sesuaikan imports dan path sesuai struktur project Anda
 * 3. Tambahkan Strapi content types di Strapi admin panel
 */

import { Suspense } from 'react';
import { getCompanyInfo, getTeamMembers, getServices } from '@/services/strapiService';
import { CompanyInfoDisplay } from '@/components/CompanyInfoDisplay';
import { TeamMembersDisplay } from '@/components/TeamMembersDisplay';
import { ServicesDisplay } from '@/components/ServicesDisplay';
import { CompanyInfo, StrapiFetchResponse, TeamMember, Service } from '@/types/strapi';

// Revalidate setiap 1 jam
export const revalidate = 3600;

// Metadata untuk SEO
export const metadata = {
  title: 'About Us | Your Company',
  description: 'Learn about our company, team, and services',
};

async function CompanyInfoSection() {
  try {
    const response = await getCompanyInfo();
    const data: CompanyInfo = response.data;
    return <CompanyInfoDisplay data={data} />;
  } catch (error) {
    console.error('Error loading company info:', error);
    return <CompanyInfoDisplay data={null} error={error as Error} />;
  }
}

async function TeamSection() {
  try {
    const data: StrapiFetchResponse<TeamMember> = await getTeamMembers();
    return <TeamMembersDisplay data={data} />;
  } catch (error) {
    console.error('Error loading team members:', error);
    return <TeamMembersDisplay data={null} error={error as Error} />;
  }
}

async function ServicesSection() {
  try {
    const data: StrapiFetchResponse<Service> = await getServices();
    return <ServicesDisplay data={data} />;
  } catch (error) {
    console.error('Error loading services:', error);
    return <ServicesDisplay data={null} error={error as Error} />;
  }
}

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin">Loading...</div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="space-y-20 py-12 px-4 max-w-7xl mx-auto">
      {/* Company Info */}
      <Suspense fallback={<LoadingFallback />}>
        <CompanyInfoSection />
      </Suspense>

      {/* Services */}
      <Suspense fallback={<LoadingFallback />}>
        <ServicesSection />
      </Suspense>

      {/* Team Members */}
      <Suspense fallback={<LoadingFallback />}>
        <TeamSection />
      </Suspense>
    </div>
  );
}

/**
 * ALTERNATIVE: Client-side rendering dengan custom hook
 * 
 * 'use client';
 * 
 * import { useStrapiData } from '@/hooks/useStrapi';
 * import { CompanyInfoDisplay } from '@/components/CompanyInfoDisplay';
 * import { TeamMembersDisplay } from '@/components/TeamMembersDisplay';
 * import { ServicesDisplay } from '@/components/ServicesDisplay';
 * import { CompanyInfo, StrapiFetchResponse, TeamMember, Service } from '@/types/strapi';
 * 
 * export default function ProfilePage() {
 *   const companyInfo = useStrapiData<CompanyInfo>('/company-info?populate=*');
 *   const teamMembers = useStrapiData<StrapiFetchResponse<TeamMember>>('/team-members?populate=*');
 *   const services = useStrapiData<StrapiFetchResponse<Service>>('/services?populate=*');
 *
 *   return (
 *     <div className="space-y-20 py-12 px-4 max-w-7xl mx-auto">
 *       <CompanyInfoDisplay 
 *         data={companyInfo.data} 
 *         loading={companyInfo.loading}
 *         error={companyInfo.error}
 *       />
 *       <ServicesDisplay 
 *         data={services.data}
 *         loading={services.loading}
 *         error={services.error}
 *       />
 *       <TeamMembersDisplay 
 *         data={teamMembers.data}
 *         loading={teamMembers.loading}
 *         error={teamMembers.error}
 *       />
 *     </div>
 *   );
 * }
 */
