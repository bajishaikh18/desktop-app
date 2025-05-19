import { SelectOption } from "../types/formTypes";

export const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[0-9]+$/,
  nationalId: /^[0-9]+$/,
  passport: /^[A-Z0-9]{6,9}$/,
};

export const countryOptions: SelectOption[] = [
  { value: "india", label: "India" },
  { value: "uae", label: "UAE" },
  { value: "saudi", label: "Saudi Arabia" },
];

export const cityOptions: SelectOption[] = [
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
];

export const genderOptions: SelectOption[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export const nationalityOptions: SelectOption[] = [
  { value: "indian", label: "Indian" },
  { value: "american", label: "American" },
  { value: "british", label: "British" },
];

export const gccCountryOptions: SelectOption[] = [
  { value: "bahrain", label: "Bahrain" },
  { value: "kuwait", label: "Kuwait" },
  { value: "oman", label: "Oman" },
  { value: "qatar", label: "Qatar" },
  { value: "saudiarabia", label: "Saudi Arabia" },
  { value: "uae", label: "UAE" },
  { value: "yemen", label: "Yemen" },
];

export const positionOptions: SelectOption[] = [
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "engineer", label: "Engineer" },
  { value: "driver", label: "Driver" },
  { value: "technician", label: "Technician" },
  { value: "labour", label: "Labour" },
];

export const maritalStatusOptions: SelectOption[] = [
  { value: "married", label: "Married" },
  { value: "single", label: "Single" },
];

export const visaTypeOptions: SelectOption[] = [
  { value: "workvisa", label: "Work Visa" },
  { value: "familyvisa", label: "Family Visa" },
];
