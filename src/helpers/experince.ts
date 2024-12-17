
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

export const generateExperienceRanges = (rangeStep: number, steps: number): { value: string; label: string }[] => {
  const experienceRanges: { value: string; label: string }[] = [];

  for (let i = 0; i < steps; i++) {
    if (i < steps - 1) {
      experienceRanges.push({
        value: `${i}`,
        label: `${i}-${i + rangeStep} Years`,
      });
    } else {
      experienceRanges.push({
        value: `${i}`,
        label: `${i}+ Years`,
      });
    }
  }

  return experienceRanges;
};


export const yearsOfExperience = generateExperienceRanges(rangeStep, maxYears + 1);
