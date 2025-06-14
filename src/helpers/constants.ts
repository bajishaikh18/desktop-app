// export const BASE_URL = 'https://ec2-3-110-104-29.ap-south-1.compute.amazonaws.com:3030';

// export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ec2-65-1-25-159.ap-south-1.compute.amazonaws.com';
// export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||"https://boon-backend-public-dev.s3.ap-south-1.amazonaws.com"
// export const EMPLOYER_URL = process.env.NEXT_PUBLIC_EMPLOYER_URL;

// export const BASE_URL = 'https://ec2-3-110-104-29.ap-south-1.compute.amazonaws.com:3030';

// export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ec2-65-1-25-159.ap-south-1.compute.amazonaws.com';
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
  "https://boon-backend-public-dev.s3.ap-south-1.amazonaws.com";
// export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL

export const EMPLOYER_URL = process.env.NEXT_PUBLIC_EMPLOYER_URL;

export const COUNTRIES = {
  sa: {
    label: "Saudi Arabia",
    isdCode: "+966",
    currency: "SAR",
    iso3Code: "KSA",
  },
  in: { label: "India", isdCode: "+91", currency: "INR", iso3Code: "IND" },
  qa: { label: "Qatar", isdCode: "+974", currency: "QAR", iso3Code: "QAT" },
  ae: {
    label: "United Arab Emrites",
    isdCode: "+971",
    currency: "AED",
    iso3Code: "UAE",
  },
  om: { label: "Oman", isdCode: "+968", currency: "OMR", iso3Code: "OMN" },
  bh: { label: "Bahrain", isdCode: "+973", currency: "BHD", iso3Code: "BHR" },
  kw: { label: "Kuwait", isdCode: "+965", currency: "KWD", iso3Code: "KWT" },
};

export const FACILITIES_IMAGES = {
  Food: "/icons/food.svg",
  Transportation: "/icons/transport.svg",
  Stay: "/icons/stay.svg",
  Recruitment: "/icons/recruit.svg",
};

export const INDUSTRIES = {
  oil_gas: "Oil & Gas",
  constructions: "Constructions",
  facility_management: "Facility Management / Operations Maintenance",
  hospitality: "Hospitality",
  manufacturing: "Manufacturing",
  logistics: "Logistics & E-Commerce",
  health_care: "Health Care",
  information_technology: "Information Technology",
  education: "Education",
  travel_tourism: "Travel & Tourism",
  tele_communication: "Tele Communication",
  banking_finance: "Banking & Finance",
  fcmg: "FMCG",
  retail: "Retail",
};
