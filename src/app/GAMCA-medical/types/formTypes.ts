import { CSSProperties, ChangeEvent } from "react";

export interface FormData {
  country: string;
  city: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  nationality: string;
  travelingToCountry: string;
  position: string;
  otherPosition: string;
  passportNumber: string;
  confirmPassportNumber: string;
  passportIssuePlace: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  email: string;
  phone: string;
  maritalStatus: string;
  visaType: string;
  nationalId: string;
  isTermsAccepted: boolean;
  isOtherPositionChecked: boolean;
}

export interface FormErrors {
  email: string;
  phone: string;
  nationalId: string;
  passportNumber: string;
  confirmPassportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  dob: string;
}

export interface SelectOption {
  value: string;
  label: string;
}
