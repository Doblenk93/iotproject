import { Contacts } from '@/components/Contacts';
import { ContactHero } from '@/components/pages/contact/ContactHero';
import { ContactEmergency } from '@/components/pages/contact/ContactEmergency';
import { getContactPageComplete, getGeneralInfoContact } from '@/services/strapiService';
import type { ContactPageData, ContactDetails } from '@/types/contact';

export default async function ContactPage() {
  let contactPage: ContactPageData = {};
  let contactDetails: ContactDetails = {};

  try {
    const pageInfo = await getContactPageComplete();
    const generalInfo = await getGeneralInfoContact();

    contactPage = pageInfo?.data || {};
    contactDetails = generalInfo.data || {};
  } catch (err) {
    console.error('Failed to load Strapi contact page data:', err);
  }

  return (
    <div className="min-h-screen">
      <ContactHero data={contactPage} />
      <Contacts contactData={contactDetails} />
      <ContactEmergency contactDetails={contactDetails} />
    </div>
  );
}
