'use client';

/**
 * Contoh Komponen: Team Members dari Strapi
 */

import Image from 'next/image';
import { TeamMember, StrapiFetchResponse } from '@/types/strapi';
import { getStrapiImageUrl } from '@/services/strapiService';

interface TeamMembersDisplayProps {
  data: StrapiFetchResponse<TeamMember> | null;
  loading?: boolean;
  error?: Error | null;
}

export function TeamMembersDisplay({ data, loading, error }: TeamMembersDisplayProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin">Loading team members...</div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="text-center py-10 text-red-600">
        Error loading team members
      </div>
    );
  }

  const teamMembers = data.data;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Our Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const { attributes } = member;
  const photoUrl = attributes.photo?.data
    ? getStrapiImageUrl(attributes.photo.data.attributes.url)
    : null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Photo */}
      {photoUrl && (
        <div className="relative w-full h-64 bg-gray-200">
          <Image
            src={photoUrl}
            alt={attributes.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Info */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold">{attributes.name}</h3>
        <p className="text-sm text-blue-600 font-semibold">{attributes.position}</p>

        {attributes.bio && (
          <p className="text-gray-600 text-sm leading-relaxed">{attributes.bio}</p>
        )}

        {attributes.email && (
          <a
            href={`mailto:${attributes.email}`}
            className="text-sm text-blue-500 hover:underline block"
          >
            {attributes.email}
          </a>
        )}

        {/* Social Links */}
        {attributes.socialLinks && attributes.socialLinks.length > 0 && (
          <div className="flex gap-3 pt-2">
            {attributes.socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
                title={social.platform}
              >
                {/* Add icons based on platform */}
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {social.platform}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
