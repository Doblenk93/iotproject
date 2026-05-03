"use client";

//import { useState } from 'react';
//import Link from 'next/link';
import type { FC } from 'react';
import { Youtube, Music2, Instagram, Facebook, Share2, Mail, Phone, MapPin, /*Send*/ } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatPhoneNumber } from '@/utils/formatter';


type PlatformType = 'YouTube' | 'TikTok' | 'Instagram' | 'Facebook';

interface Social {
  id: string;
  Url?: string;
  Username?: string;
  Platform: PlatformType[];
}

interface Contact {
  id: string;
  Name?: string;
  defaultMessage?: string;
  Phone?: string;
}

interface FooterData {
  CompanyName?: string;
  Tagline?: string;
  Socials?: Social[];
  Address?: string;
  Email?: string;
  Contacts?: Contact[];
}

interface FooterProps {
  data?: FooterData;
}

type IconComponent = FC<{ className?: string }>;

interface PlatformConfig {
  icon: IconComponent;
  label: string;
  color: string;
}


const PLATFORM_CONFIG: Record<PlatformType, PlatformConfig> = {
  YouTube: { icon: Youtube, label: 'YouTube', color: '#22c55e' },
  TikTok: { icon: Music2, label: 'TikTok', color: '#22c55e' },
  Instagram: { icon: Instagram, label: 'Instagram', color: '#22c55e' },
  Facebook: { icon: Facebook, label: 'Facebook', color: '#22c55e' },
};

const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  icon: Share2,
  label: 'Social',
  color: '#22c55e',
};

// Default values jika data dari Strapi tidak tersedia

const DEFAULTS = {
  COMPANY_NAME: 'Pakar Ekosistem Indonesia',
  TAGLINE: 'Pelopor solusi ramah lingkungan untuk masa depan yang lebih baik.',
  ADDRESS: 'Trusmiland Rumah Ningrat Blok B No 48, Desa Cracas Kec. Cilimus, Kuningan Jawa Barat, 45556',
  EMAIL: 'pakar.ekosistem@gmail.com',
  PHONE: '+628123456789',
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get first platform from array or return as-is
 * Safely extracts platform key from Strapi data
 */
function getPlatformKey(platform: PlatformType | PlatformType[]): PlatformType {
  return Array.isArray(platform) ? platform[0] : platform;
}

/**
 * Get platform configuration with fallback
 * Type-safe lookup in PLATFORM_CONFIG
 */
function getPlatformConfig(platform: PlatformType | PlatformType[]): PlatformConfig {
  const key = getPlatformKey(platform);
  return PLATFORM_CONFIG[key] ?? DEFAULT_PLATFORM_CONFIG;
}

/**
 * Extract display name from URL
 * Removes protocol for cleaner display
 */
function getDisplayName(url?: string, username?: string): string {
  if (username) return username;
  if (!url) return 'Link';
  return url.replace(/^https?:\/\/(www\.)?/, '');
}

/**
 * Format phone for calling
 * Removes all non-digits for tel: links
 */
function getPhoneLink(phone?: string): string {
  return `tel:${phone?.replace(/\D/g, '') || DEFAULTS.PHONE}`;
}

/**
 * Format contact phone display
 * Returns formatted phone or default
 */
function getPhoneDisplay(phone?: string, name?: string): string {
  return formatPhoneNumber(phone || DEFAULTS.PHONE, name || '');
}

interface SocialLinkProps {
  social: Social;
}

/**
 * Individual social media link
 * Extracted component for cleaner code
 */
function SocialLink({ social }: SocialLinkProps) {
  const config = getPlatformConfig(social.Platform);
  const displayName = getDisplayName(social.Url, social.Username);

  return (
    <a
      key={social.id}
      href={social.Url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 w-fit"
      aria-label={config.label}
    >
      {/* Icon Box */}
      <div className="w-9 h-9 bg-slate-800/50 rounded-lg flex items-center justify-center group-hover:bg-[#22c55e] group-hover:text-white transition-all duration-300">
        <config.icon className="w-4 h-4" />
      </div>

      {/* Label & Display Name */}
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-slate-500 group-hover:text-[#22c55e] transition-colors">
          {config.label}
        </span>
        <span className="text-sm">{displayName}</span>
      </div>
    </a>
  );
}

/**
 * Company info section (left side)
 */
interface CompanyInfoProps {
  companyName: string;
  tagline: string;
  socials?: Social[];
}

function CompanyInfo({ companyName, tagline, socials }: CompanyInfoProps) {
  return (
    <div className="space-y-4 md:max-w-sm">
      <h3 className="text-xl font-bold text-white tracking-tight">{companyName}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{tagline}</p>

      {/* Social Links */}
      <div className="flex flex-col gap-3 pt-2">
        {socials?.map((social) => <SocialLink key={social.id} social={social} />)}
      </div>
    </div>
  );
}

/**
 * Contact info section (right side)
 */
interface ContactInfoProps {
  primaryContact?: Contact;
  address: string;
  email: string;
}

function ContactInfo({ primaryContact, address, email }: ContactInfoProps) {
  return (
    <div className="md:max-w-md xl:max-w-lg">
      <h3 className="text-lg font-semibold text-white mb-4 lg:mb-6">Hubungi Kami</h3>
      <ul className="space-y-4 text-sm">
        {/* Address */}
        <li className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">{address}</span>
        </li>

        {/* Phone */}
        <li className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
          <a
            href={getPhoneLink(primaryContact?.Phone)}
            className="hover:text-white transition-colors"
          >
            {getPhoneDisplay(primaryContact?.Phone, primaryContact?.Name)}
          </a>
        </li>

        {/* Email */}
        <li className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
          <a
            href={`mailto:${email}`}
            className="hover:text-white transition-colors break-all"
          >
            {email}
          </a>
        </li>
      </ul>
    </div>
  );
}

export function Footer({ data }: FooterProps): React.ReactElement {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const {
    CompanyName = DEFAULTS.COMPANY_NAME,
    Tagline = DEFAULTS.TAGLINE,
    Socials,
    Address = DEFAULTS.ADDRESS,
    Email = DEFAULTS.EMAIL,
    Contacts,
  } = data || {};

  const primaryContact = Contacts?.[0];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-8 mb-12">
          <CompanyInfo
            companyName={CompanyName}
            tagline={Tagline}
            socials={Socials}
          />
          <ContactInfo
            primaryContact={primaryContact}
            address={Address}
            email={Email}
          />
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 pt-8 flex items-center justify-center text-xs text-slate-500">
          <p className="text-center">
            &copy; {year} {CompanyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}