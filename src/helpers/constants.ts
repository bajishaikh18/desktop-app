// export const BASE_URL = 'https://ec2-3-110-104-29.ap-south-1.compute.amazonaws.com:3030';
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const IMAGE_BASE_URL = "https://wonderlybackendpublic.s3.ap-south-1.amazonaws.com";

export const COUNTRIES = {
    sa: { label: "Saudi Arabia", isdCode: "+966",currency:"SAR" },
    in: { label: "India", isdCode: "+91",currency:"INR" },
    qa: { label: "Qatar", isdCode: "+974",currency:"QAR" },
    ae: { label: "United Arab Emrites", isdCode: "+971",currency:"AED" },
    om: { label: "Oman",isdCode: "+968",currency:"OMR" },
    bh: { label: "Bahrain",isdCode: "+973",currency:"BHD" },
    kw: { label: "Kuwait",isdCode: "+965",currency:"KWD" },
  };
  
export const FACILITIES_IMAGES = {
    "Food":"/icons/food.svg",
    "Transportation": "/icons/transport.svg",
    "Stay": "/icons/stay.svg",
    "Recruitment":"/icons/recruit.svg"
}
  
