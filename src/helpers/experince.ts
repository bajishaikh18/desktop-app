

export const experienceLabels: Record<string, string> = {
   "1": "1-2 years",
  "2": "2-3 years",
  "3": "3-4 years",
  "4": "4-5 years",
  "5": "5-6 years",
  "6": "6-7 years",
  "7": "7-8 years",
  "8": "8-9 years",
  "9": "9-10 years",
  "10": "10+ years"
  };
  
 
  export const getExperienceLabel = (experience: string): string => {
    return experienceLabels[experience] || `${experience} years`; 
  };
  