const env = import.meta.env;

function numberValue(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export const siteConfig = {
  donationUrl: env.VITE_DONATION_URL || "#give",
  fundsRaised: numberValue(env.VITE_FUNDS_RAISED, 10_000),
  fundraisingGoal: numberValue(env.VITE_FUNDRAISING_GOAL, 4_000_000),
  landAcquisitionCost: numberValue(env.VITE_LAND_ACQUISITION_COST, 3_200_000),
  initialBuildingCost: numberValue(env.VITE_INITIAL_BUILDING_COST, 800_000),
  sponsorshipAmount: numberValue(env.VITE_SPONSORSHIP_AMOUNT, 10_000),
  milestones: [
    { amount: numberValue(env.VITE_MILESTONE_1_AMOUNT, 1_000_000), date: env.VITE_MILESTONE_1_DATE || "December 31, 2026", label: "Land acquisition" },
    { amount: numberValue(env.VITE_MILESTONE_2_AMOUNT, 1_000_000), date: env.VITE_MILESTONE_2_DATE || "March 10, 2027", label: "Land acquisition" },
    { amount: numberValue(env.VITE_MILESTONE_3_AMOUNT, 1_200_000), date: env.VITE_MILESTONE_3_DATE || "May 31, 2027", label: "Complete acquisition" },
    { amount: numberValue(env.VITE_MILESTONE_4_AMOUNT, 800_000), date: env.VITE_MILESTONE_4_DATE || "December 31, 2027", label: "Initial building" },
  ],
  contactEmail: env.VITE_CONTACT_EMAIL || "contact@cicsnw.org",
  classesEmail: env.VITE_CLASSES_EMAIL || "taiba@cicsnw.org",
  phone: env.VITE_PHONE || "+1 604 780 0048",
  addressLine1: env.VITE_ADDRESS_LINE_1 || "1206 Kingston Street",
  addressLine2: env.VITE_ADDRESS_LINE_2 || "New Westminster, BC",
  charityRegistrationNumber: env.VITE_CHARITY_REGISTRATION_NUMBER || "769877523RR0001",
  whatsappUrl: env.VITE_WHATSAPP_URL || "https://chat.whatsapp.com/Ecg1NHbuhgQHr5lZ2XxsqH?s=cl&p=a&ilr=1",
  facebookUrl: env.VITE_FACEBOOK_URL || "https://www.facebook.com/cicsnw.org",
  instagramUrl: env.VITE_INSTAGRAM_URL || "https://www.instagram.com/taibamusallah",
  youtubeUrl: env.VITE_YOUTUBE_URL || "https://youtube.com/@canadianislamicculturalsociety",
  athanDesktopEmbedUrl: env.VITE_ATHAN_DESKTOP_EMBED_URL || "https://timing.athanplus.com/masjid/widgets/embed?theme=6&masjid_id=adJkaqKk",
  athanMobileEmbedUrl: env.VITE_ATHAN_MOBILE_EMBED_URL || "https://timing.athanplus.com/masjid/widgets/embed?theme=3&masjid_id=adJkaqKk",
  awqatUrl: env.VITE_AWQAT_URL || "https://www.awqat.net/masjid/taiba-musallah",
};
