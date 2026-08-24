function requiredValue(name: string, value: string | undefined) {
  if (!value?.trim()) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function numberValue(name: string, value: string | undefined) {
  const configuredValue = requiredValue(name, value);
  const parsed = Number(configuredValue);
  if (!Number.isFinite(parsed) || parsed < 0) throw new Error(`Invalid non-negative number for ${name}`);
  return parsed;
}

export const siteConfig = {
  donationUrl: requiredValue("VITE_DONATION_URL", import.meta.env.VITE_DONATION_URL),
  fundsRaised: numberValue("VITE_FUNDS_RAISED", import.meta.env.VITE_FUNDS_RAISED),
  fundraisingGoal: numberValue("VITE_FUNDRAISING_GOAL", import.meta.env.VITE_FUNDRAISING_GOAL),
  landAcquisitionCost: numberValue("VITE_LAND_ACQUISITION_COST", import.meta.env.VITE_LAND_ACQUISITION_COST),
  initialBuildingCost: numberValue("VITE_INITIAL_BUILDING_COST", import.meta.env.VITE_INITIAL_BUILDING_COST),
  sponsorshipAmount: numberValue("VITE_SPONSORSHIP_AMOUNT", import.meta.env.VITE_SPONSORSHIP_AMOUNT),
  milestones: [
    { amount: numberValue("VITE_MILESTONE_1_AMOUNT", import.meta.env.VITE_MILESTONE_1_AMOUNT), date: requiredValue("VITE_MILESTONE_1_DATE", import.meta.env.VITE_MILESTONE_1_DATE), label: "Land acquisition" },
    { amount: numberValue("VITE_MILESTONE_2_AMOUNT", import.meta.env.VITE_MILESTONE_2_AMOUNT), date: requiredValue("VITE_MILESTONE_2_DATE", import.meta.env.VITE_MILESTONE_2_DATE), label: "Land acquisition" },
    { amount: numberValue("VITE_MILESTONE_3_AMOUNT", import.meta.env.VITE_MILESTONE_3_AMOUNT), date: requiredValue("VITE_MILESTONE_3_DATE", import.meta.env.VITE_MILESTONE_3_DATE), label: "Complete acquisition" },
    { amount: numberValue("VITE_MILESTONE_4_AMOUNT", import.meta.env.VITE_MILESTONE_4_AMOUNT), date: requiredValue("VITE_MILESTONE_4_DATE", import.meta.env.VITE_MILESTONE_4_DATE), label: "Initial building" },
  ],
  contactEmail: requiredValue("VITE_CONTACT_EMAIL", import.meta.env.VITE_CONTACT_EMAIL),
  classesEmail: requiredValue("VITE_CLASSES_EMAIL", import.meta.env.VITE_CLASSES_EMAIL),
  phone: requiredValue("VITE_PHONE", import.meta.env.VITE_PHONE),
  addressLine1: requiredValue("VITE_ADDRESS_LINE_1", import.meta.env.VITE_ADDRESS_LINE_1),
  addressLine2: requiredValue("VITE_ADDRESS_LINE_2", import.meta.env.VITE_ADDRESS_LINE_2),
  newMasjidLocationLine1: requiredValue("VITE_NEW_MASJID_LOCATION_LINE_1", import.meta.env.VITE_NEW_MASJID_LOCATION_LINE_1),
  newMasjidLocationLine2: requiredValue("VITE_NEW_MASJID_LOCATION_LINE_2", import.meta.env.VITE_NEW_MASJID_LOCATION_LINE_2),
  newMasjidMapsUrl: requiredValue("VITE_NEW_MASJID_MAPS_URL", import.meta.env.VITE_NEW_MASJID_MAPS_URL),
  charityRegistrationNumber: requiredValue("VITE_CHARITY_REGISTRATION_NUMBER", import.meta.env.VITE_CHARITY_REGISTRATION_NUMBER),
  whatsappUrl: requiredValue("VITE_WHATSAPP_URL", import.meta.env.VITE_WHATSAPP_URL),
  facebookUrl: requiredValue("VITE_FACEBOOK_URL", import.meta.env.VITE_FACEBOOK_URL),
  instagramUrl: requiredValue("VITE_INSTAGRAM_URL", import.meta.env.VITE_INSTAGRAM_URL),
  youtubeUrl: requiredValue("VITE_YOUTUBE_URL", import.meta.env.VITE_YOUTUBE_URL),
  athanDesktopEmbedUrl: requiredValue("VITE_ATHAN_DESKTOP_EMBED_URL", import.meta.env.VITE_ATHAN_DESKTOP_EMBED_URL),
  athanMobileEmbedUrl: requiredValue("VITE_ATHAN_MOBILE_EMBED_URL", import.meta.env.VITE_ATHAN_MOBILE_EMBED_URL),
  awqatUrl: requiredValue("VITE_AWQAT_URL", import.meta.env.VITE_AWQAT_URL),
};
