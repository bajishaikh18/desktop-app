"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  countryOptions,
  cityOptions,
  genderOptions,
  nationalityOptions,
  gccCountryOptions,
  positionOptions,
  maritalStatusOptions,
  visaTypeOptions,
  VALIDATION_PATTERNS,
} from "./constants/formConstants";
import FormField from "./components/FormField";
import SelectField from "./components/SelectField";
import SectionHeading from "./components/SectionHeading";
import "./styles/formStyles.scss";
import { FormData, FormErrors } from "./types/formTypes";

const MedicalPage: React.FC = () => {
  const router = useRouter();

  // Form state with proper typing
  const [formData, setFormData] = useState<FormData>({
    // Location section
    country: "",
    city: "",

    // Personal details section
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    nationality: "",
    travelingToCountry: "",
    position: "",
    otherPosition: "",

    // Passport section
    passportNumber: "",
    confirmPassportNumber: "",
    passportIssuePlace: "",
    passportIssueDate: "",
    passportExpiryDate: "",

    // Contact section
    email: "",
    phone: "",

    // Additional info section
    maritalStatus: "",
    visaType: "",
    nationalId: "",

    // Confirmation
    isTermsAccepted: false,
    isOtherPositionChecked: false,
  });

  // Form errors state with proper typing
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: "",
    phone: "",
    nationalId: "",
    passportNumber: "",
    confirmPassportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    dob: "",
  });

  // Handle input changes with proper typing
  const handleInputChange =
    (field: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setFormData({ ...formData, [field]: value });

      // Clear error when field changes
      if (field in formErrors) {
        setFormErrors({ ...formErrors, [field]: "" });
      }

      // Special handling for passport confirmation
      if (field === "passportNumber" || field === "confirmPassportNumber") {
        // If we're changing the passport number and confirm exists, clear confirm errors
        if (field === "passportNumber" && formData.confirmPassportNumber) {
          setFormErrors({
            ...formErrors,
            passportNumber: "",
            confirmPassportNumber: "",
          });
        }
      }
    };

  // Handle toggle of "Other" position checkbox
  const handleOtherPositionToggle = () => {
    const newIsChecked = !formData.isOtherPositionChecked;

    setFormData({
      ...formData,
      isOtherPositionChecked: newIsChecked,
      // Clear position field if selecting "Other", clear otherPosition if unselecting
      position: newIsChecked ? "" : formData.position,
      otherPosition: newIsChecked ? formData.otherPosition : "",
    });
  };

  // Validation function for a single field
  const validateField = (field: keyof FormErrors, value: string): string => {
    switch (field) {
      case "email":
        return value && !VALIDATION_PATTERNS.email.test(value)
          ? "Please enter a valid email address."
          : "";

      case "phone":
        return value && !VALIDATION_PATTERNS.phone.test(value)
          ? "Please enter valid phone number only."
          : "";

      case "nationalId":
        if (!value) return "";
        if (!/^[0-9]+$/.test(value)) return "Please enter valid ID.";
        if (value.length !== 12)
          return "National ID must be exactly 12 digits.";
        return "";

      case "passportNumber":
        return value && !VALIDATION_PATTERNS.passport.test(value)
          ? "Enter valid passport number."
          : "";

      case "confirmPassportNumber":
        return value && value !== formData.passportNumber
          ? "Passport numbers do not match."
          : "";

      default:
        return "";
    }
  };

  // Field blur handler for validation
  const handleBlur =
    (field: keyof FormErrors) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const error = validateField(field, value);

      // For confirmPassportNumber, also check match
      if (
        field === "confirmPassportNumber" &&
        value &&
        value !== formData.passportNumber
      ) {
        setFormErrors({
          ...formErrors,
          [field]: "Passport numbers do not match.",
        });
        return;
      }

      if (error) {
        setFormErrors({
          ...formErrors,
          [field]: error,
        });
      }
    };

  // Back button handler
  const handleBackClick = () => {
    window.history.back();
  };

  // Complete form validation and submission
  const handleNextClick = () => {
    // Implement form validation here before navigating
    // For now, just navigate as in the original code
    router.push("/GAMCA-medical/payment-summary");
  };

  // Utility to format Aadhar with spaces after every 4 digits
  const formatAadhar = (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

  return (
    <div
      style={{
        maxWidth: "calc(100% - 520px)",
        margin: "6rem 260px 1rem 260px",
        padding: "2rem",
      }}
    >
      <div className="row">
        <div className="col-12">
          {/* Header */}
          <div className="d-flex align-items-center mb-3">
            <button
              onClick={handleBackClick}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
              aria-label="Back"
            >
              <Image src="/back.svg" alt="Back" width={26} height={26} />
            </button>
            <h1 className="ms-3 mb-0 fw-bold main-heading-custom">
              GAMCA Slot Booking
            </h1>
          </div>

          {/* Location Section */}
          <SectionHeading>Where are you located?</SectionHeading>
          <div className="row mb-4">
            <SelectField
              label="Country"
              required
              options={countryOptions}
              value={formData.country}
              onChange={
                handleInputChange("country") as (
                  e: ChangeEvent<HTMLSelectElement>
                ) => void
              }
              placeholder="Select your country"
            />
            <SelectField
              label="City"
              required
              options={cityOptions}
              value={formData.city}
              onChange={
                handleInputChange("city") as (
                  e: ChangeEvent<HTMLSelectElement>
                ) => void
              }
              placeholder="Select your city"
            />
          </div>

          {/* Personal Details Section */}
          <SectionHeading>Tell us about yourself</SectionHeading>
          <div className="row mb-4">
            <FormField
              label="First Name"
              required
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
              style={{}}
              onBlur={() => {}}
              error=""
            />
            <FormField
              label="Last Name"
              required
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              style={{}}
              onBlur={() => {}}
              error=""
            />
            <FormField
              label="Date of Birth"
              required
              type="date"
              placeholder="Select date"
              value={formData.dob}
              onChange={handleInputChange("dob")}
              onBlur={handleBlur("dob")}
              error={formErrors.dob}
              max={new Date().toISOString().split("T")[0]} // Prevent future dates
              style={{}}
            />
            <SelectField
              label="Gender"
              required
              options={genderOptions}
              value={formData.gender}
              onChange={
                handleInputChange("gender") as (
                  e: ChangeEvent<HTMLSelectElement>
                ) => void
              }
              placeholder="Select Gender"
            />
            <SelectField
              label="Nationality"
              required
              options={nationalityOptions}
              value={formData.nationality}
              onChange={
                handleInputChange("nationality") as (
                  e: ChangeEvent<HTMLSelectElement>
                ) => void
              }
              placeholder="Select Nationality"
            />
            <SelectField
              label="Country Traveling To (GCC)"
              required
              options={gccCountryOptions}
              value={formData.travelingToCountry}
              onChange={
                handleInputChange("travelingToCountry") as (
                  e: ChangeEvent<HTMLSelectElement>
                ) => void
              }
              placeholder="Select GCC Country"
            />
            <SelectField
              label="Position Applied For"
              required
              options={positionOptions}
              value={formData.position}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                handleInputChange("position")(e);
                setFormData((prev) => ({
                  ...prev,
                  position: e.target.value,
                  otherPosition: "",
                  isOtherPositionChecked: false,
                }));
              }}
              placeholder="------------"
              disabled={formData.isOtherPositionChecked}
            />

            {/* Other position option */}
            <div className="col-md-6 mb-3">
              <label className="form-label mb-1 fw-bold form-label-custom">
                Other
              </label>
              <div className="d-flex align-items-center">
                <input
                  className="form-check-input me-2 mt-0"
                  type="checkbox"
                  id="otherOption"
                  checked={formData.isOtherPositionChecked}
                  onChange={handleOtherPositionToggle}
                  style={{ width: "16px", height: "16px" }}
                />
                <input
                  type="text"
                  className="form-control form-control-custom"
                  placeholder="Specify other position"
                  disabled={!formData.isOtherPositionChecked}
                  value={formData.otherPosition}
                  onChange={handleInputChange("otherPosition")}
                />
              </div>
            </div>
          </div>

          {/* Passport Information Section */}
          <SectionHeading>Passport Information</SectionHeading>
          <div className="row mb-4">
            <FormField
              label="Passport Number"
              required
              placeholder="Enter passport number"
              value={formData.passportNumber}
              onChange={handleInputChange("passportNumber")}
              onBlur={handleBlur("passportNumber")}
              error={formErrors.passportNumber}
              pattern="^[A-Z0-9]{6,9}$"
              style={{}}
            />
            <FormField
              label="Confirm Passport Number"
              required
              placeholder="Re-enter passport number"
              value={formData.confirmPassportNumber}
              onChange={handleInputChange("confirmPassportNumber")}
              onBlur={handleBlur("confirmPassportNumber")}
              error={formErrors.confirmPassportNumber}
              style={{}}
            />
            <FormField
              label="Passport Issue Place"
              required
              placeholder="Enter issue place"
              value={formData.passportIssuePlace}
              onChange={handleInputChange("passportIssuePlace")}
              style={{}}
              onBlur={() => {}}
              error=""
            />
            <FormField
              label="Passport Issue Date"
              required
              type="date"
              placeholder="Select date"
              value={formData.passportIssueDate}
              onChange={handleInputChange("passportIssueDate")}
              onBlur={handleBlur("passportIssueDate")}
              error={formErrors.passportIssueDate}
              max={new Date().toISOString().split("T")[0]} // Prevent future dates
              style={{}}
            />
            <FormField
              label="Passport Expiry Date"
              required
              type="date"
              placeholder="Select date"
              value={formData.passportExpiryDate}
              onChange={handleInputChange("passportExpiryDate")}
              onBlur={handleBlur("passportExpiryDate")}
              error={formErrors.passportExpiryDate}
              min={
                new Date(Date.now() + 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              } // Only allow tomorrow and future dates
              style={{}}
            />
          </div>

          {/* Contact Information Section */}
          <SectionHeading>Contact Information</SectionHeading>
          <div className="row mb-4">
            <FormField
              label="Email ID"
              required
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleInputChange("email")}
              onBlur={handleBlur("email")}
              error={formErrors.email}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              style={{}}
            />
            <FormField
              label="Phone Number"
              required
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleInputChange("phone")}
              onBlur={handleBlur("phone")}
              error={formErrors.phone}
              pattern="^[0-9]+$"
              style={{}}
            />
          </div>

          {/* Additional Information Section */}
          <SectionHeading>Additional information</SectionHeading>
          <div className="row mb-4">
            <SelectField
              label="Marital Status"
              options={maritalStatusOptions}
              value={formData.maritalStatus}
              onChange={
                handleInputChange("maritalStatus") as (
                  e: ChangeEvent<HTMLSelectElement>
                ) => void
              }
              placeholder="Select marital status"
            />
            <SelectField
              label="Visa Type"
              options={visaTypeOptions}
              value={formData.visaType}
              onChange={
                handleInputChange("visaType") as (
                  e: ChangeEvent<HTMLSelectElement>
                ) => void
              }
              placeholder="Select visa type"
            />
            <FormField
              label="National ID (Aadhar)"
              placeholder="Enter National ID"
              value={formData.nationalId}
              onChange={handleInputChange("nationalId")}
              onBlur={handleBlur("nationalId")}
              error={formErrors.nationalId}
              pattern="^[0-9]{12}$"
              maxLength={12}
              minLength={12}
              style={{}}
            />
          </div>

          {/* Terms and Conditions */}
          <div className="mb-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="confirmCheck"
                required
                checked={formData.isTermsAccepted}
                onChange={handleInputChange("isTermsAccepted")}
              />
              <label
                className="form-check-label"
                htmlFor="confirmCheck"
                style={{
                  textAlign: "justify",
                  display: "block",
                  marginLeft: 0,
                  marginRight: 0,
                }}
              >
                I hereby confirm that the information provided in this form is
                true, complete, and accurate to the best of my knowledge. Please
                note that the official charge for Wafid (GAMCA Medical Slip
                Generation) is USD 10$, approximately equivalent to INR 880,
                which includes foreign currency conversion and bank transfer
                fees. An additional convenience fee of INR 119 is charged by the
                Boon.ai platform. By proceeding, you acknowledge and agree to
                pay the total charges as detailed above.
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="d-flex justify-content-end align-items-center gap-3">
            <button
              className="btn btn-light d-flex justify-content-center align-items-center button-secondary-custom"
              onClick={handleBackClick}
              type="button"
            >
              Cancel
            </button>
            <button
              className="btn btn-primary d-flex justify-content-center align-items-center button-primary-custom"
              onClick={handleNextClick}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalPage;

// The most common reasons for "so many errors" on this page are:

// 1. **Missing Imports for Types:**
//    You use `FormData` and `FormErrors` in your state, but you did not import them from your types file.
//    **Fix:**
//    ```tsx
//    import { FormData, FormErrors } from "./types/formTypes";
//    ```

// 2. **Missing or Incorrect File/Folder Structure:**
//    If the `components`, `constants`, `types`, or `styles` folders/files do not exist or are misnamed, all related imports will fail.

// 3. **Incorrect SCSS Import Path:**
//    The import
//    ```tsx
//    import "./styles/formStyles.scss";
//    ```
//    expects a `styles` folder with `formStyles.scss` inside `GAMCA-medical`.

// 4. **Leftover Inline Styles:**
//    You still have inline styles in some places (e.g., the Terms and Conditions label). If you moved to SCSS, these should be replaced with class names.

// 5. **Component/Prop Mismatches:**
//    If you changed the props or structure of your components (e.g., removed `style`), but still pass them, you will get errors.

// 6. **TypeScript Errors:**
//    If you use types or interfaces that are not imported or defined, or if you pass props of the wrong type, TypeScript will show errors.

// 7. **Case Sensitivity:**
//    On some systems, file and folder names are case-sensitive.

// **Summary:**
// - Double-check all imports and file/folder names.
// - Make sure all types and components are imported from the correct paths.
// - Remove or update any leftover inline styles if you moved to SCSS.
// - Ensure your folder structure matches your import paths.
// - Check for any prop mismatches or missing props in your components.

// Fixing these issues should resolve most errors on this page.
