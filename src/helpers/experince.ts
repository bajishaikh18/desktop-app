const maxYears = 10; 
const rangeStep = 1; 


const experienceLabels: Record<string, string> = {};
for (let i = 1; i <= maxYears; i++) {
  const start = i;
  const end = start + rangeStep;
  experienceLabels[`${i}`] = `${start}-${end} years`;
}


experienceLabels[`${maxYears}`] = `${maxYears}+ years`;


export const getExperienceLabel = (experience: string): string => {
  return experienceLabels[experience] || `${experience} years`; 
};


