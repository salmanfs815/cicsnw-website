/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DONATION_URL?: string;
  readonly VITE_FUNDS_RAISED?: string;
  readonly VITE_FUNDRAISING_GOAL?: string;
  readonly VITE_LAND_ACQUISITION_COST?: string;
  readonly VITE_INITIAL_BUILDING_COST?: string;
  readonly VITE_SPONSORSHIP_AMOUNT?: string;
  readonly VITE_MILESTONE_1_AMOUNT?: string;
  readonly VITE_MILESTONE_1_DATE?: string;
  readonly VITE_MILESTONE_2_AMOUNT?: string;
  readonly VITE_MILESTONE_2_DATE?: string;
  readonly VITE_MILESTONE_3_AMOUNT?: string;
  readonly VITE_MILESTONE_3_DATE?: string;
  readonly VITE_MILESTONE_4_AMOUNT?: string;
  readonly VITE_MILESTONE_4_DATE?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CLASSES_EMAIL?: string;
  readonly VITE_PHONE?: string;
  readonly VITE_ADDRESS_LINE_1?: string;
  readonly VITE_ADDRESS_LINE_2?: string;
  readonly VITE_CHARITY_REGISTRATION_NUMBER?: string;
  readonly VITE_WHATSAPP_URL?: string;
  readonly VITE_FACEBOOK_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
  readonly VITE_YOUTUBE_URL?: string;
  readonly VITE_ATHAN_DESKTOP_EMBED_URL?: string;
  readonly VITE_ATHAN_MOBILE_EMBED_URL?: string;
  readonly VITE_AWQAT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
