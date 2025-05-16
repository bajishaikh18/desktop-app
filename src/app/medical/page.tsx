"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Add this import

const MedicalPage = () => {
  const router = useRouter(); // Initialize router
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [nationalIdError, setNationalIdError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportNumberError, setPassportNumberError] = useState("");
  const [confirmPassportNumber, setConfirmPassportNumber] = useState("");
  const [confirmPassportNumberError, setConfirmPassportNumberError] =
    useState("");
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [otherPosition, setOtherPosition] = useState(""); // State for text field
  const [position, setPosition] = useState(""); // For dropdown
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");
  const [passportIssueDate, setPassportIssueDate] = useState("");
  const [passportIssueDateError, setPassportIssueDateError] = useState("");
  const [passportExpiryDate, setPassportExpiryDate] = useState("");
  const [passportExpiryDateError, setPassportExpiryDateError] = useState("");

  const handleBackClick = () => {
    window.history.back(); // Navigates to the previous page in the browser history
  };

  // Common styles for form controls
  const formControlStyle = {
    height: "36px", // Consistent height for all form elements
    borderRadius: "8px",
    fontSize: "16px",
  };

  return (
    <div
      style={{
        maxWidth:
          "calc(100% - 520px)" /* 100% width minus left and right margins */,
        margin: "6rem 260px 1rem 260px",
        padding: "2rem",
      }}
    >
      <div className="row">
        <div className="col-12">
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
            <h1
              className="ms-3 mb-0 fw-bold"
              style={{ fontSize: "28px" }} // Gamca Medical heading 28px
            >
              GAMCA Slot Booking
            </h1>
          </div>

          <h2
            className="fs-6 fw-semibold mb-3 mt-4 section-heading"
            style={{ fontSize: "18px" }} // Side headings 18px
          >
            Where are you located?
          </h2>

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Country <span className="text-danger">*</span>
              </label>
              <select
                className="form-select mt-1"
                style={{ ...formControlStyle, height: "42px" }}
              >
                <option value="" disabled selected>
                  Select your country
                </option>
                <option value="india">India</option>
                <option value="uae">UAE</option>
                <option value="saudi">Saudi Arabia</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                City <span className="text-danger">*</span>
              </label>
              <select
                className="form-select mt-1"
                style={{ ...formControlStyle, height: "42px" }}
              >
                <option value="" disabled selected>
                  Select your city
                </option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
              </select>
            </div>
          </div>

          <h2
            className="fs-6 fw-semibold mb-3 section-heading"
            style={{ fontSize: "18px" }}
          >
            Tell us about yourself
          </h2>

          <div className="row mb-4">
            <div className="col-md-6 mb-3 ">
              <label
                className="form-label mb-1 fw-bold "
                style={{ fontSize: "14px" }} // Labels 14px
              >
                First Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="First Name"
                style={formControlStyle}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Last Name"
                style={formControlStyle}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold "
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Date of Birth <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control mt-1"
                placeholder="Select date"
                style={formControlStyle}
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setDobError("");
                }}
                onBlur={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const today = new Date();
                  if (selectedDate > today) {
                    setDobError("Date of Birth cannot be in the future.");
                  }
                }}
              />
              {dobError && (
                <div
                  style={{ color: "red", fontSize: "13px", marginTop: "2px" }}
                >
                  {dobError}
                </div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Gender <span className="text-danger">*</span>
              </label>
              <select
                className="form-select mt-1"
                style={{ ...formControlStyle, height: "42px" }}
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Nationality <span className="text-danger">*</span>
              </label>
              <select
                className="form-select mt-1"
                style={{ ...formControlStyle, height: "42px" }}
              >
                <option value="" disabled selected>
                  Select Nationality
                </option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold "
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Country Traveling To (GCC){" "}
                <span className="text-danger">*</span>
              </label>
              <select
                className="form-select mt-1"
                style={{ ...formControlStyle, height: "42px" }}
              >
                <option value="" disabled selected>
                  Select GCC Country
                </option>
                <option value="bahrain">Bahrain</option>
                <option value="kuwait">Kuwait</option>
                <option value="oman">Oman</option>
                <option value="qatar">Qatar</option>
                <option value="saudiarabia">Saudi Arabia</option>
                <option value="uae">UAE</option>
                <option value="yemen">Yemen</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Position Applied For <span className="text-danger">*</span>
              </label>
              <select
                className="form-select mt-1"
                style={{ ...formControlStyle, height: "42px", width: "100%" }}
                value={position}
                onChange={(e) => {
                  setPosition(e.target.value);
                  setOtherPosition(""); // Clear other field if dropdown is used
                  setIsChecked(false); // Uncheck "Other"
                }}
              >
                <option value="" disabled>
                  ------------
                </option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="engineer">Engineer</option>
                <option value="driver">Driver</option>
                <option value="technician">Technician</option>
                <option value="labour">Labour</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Merge: Other option with checkbox and text field */}
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }}
              >
                Other
              </label>
              <div className="d-flex align-items-center">
                <input
                  className="form-check-input me-2 mt-0"
                  type="checkbox"
                  id="otherOption"
                  checked={isChecked}
                  onChange={() => {
                    setIsChecked((prev) => {
                      if (!prev) {
                        setPosition(""); // Clear dropdown if "Other" is checked
                      } else {
                        setOtherPosition(""); // Clear text if "Other" is unchecked
                      }
                      return !prev;
                    });
                  }}
                  style={{ width: "16px", height: "16px" }}
                />
                <input
                  type="text"
                  className="form-control"
                  style={{ ...formControlStyle, height: "42px", flex: "1" }}
                  placeholder="Specify other position"
                  disabled={!isChecked}
                  value={otherPosition}
                  onChange={(e) => setOtherPosition(e.target.value)}
                />
              </div>
            </div>
          </div>

          <h2
            className="fs-6 fw-semibold mb-3 section-heading"
            style={{ fontSize: "18px" }}
          >
            Passport Information
          </h2>

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Passport Number <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter passport number"
                style={formControlStyle}
                pattern="^[A-Z][0-9]{7}$$"
                value={passportNumber}
                onChange={(e) => {
                  setPassportNumber(e.target.value);
                  setPassportNumberError("");
                  setConfirmPassportNumberError(""); // Clear confirm error on change
                }}
                onBlur={(e) => {
                  const pattern = /^[A-Z0-9]{6,9}$/;
                  if (e.target.value && !pattern.test(e.target.value)) {
                    setPassportNumberError("Enter valid passport number.");
                  }
                  // Also check match if confirm is filled
                  if (
                    confirmPassportNumber &&
                    e.target.value !== confirmPassportNumber
                  ) {
                    setConfirmPassportNumberError(
                      "Passport number do not match."
                    );
                  }
                }}
              />
              {passportNumberError && (
                <div
                  style={{ color: "red", fontSize: "13px", marginTop: "2px" }}
                >
                  {passportNumberError}
                </div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1  fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Confirm Passport Number <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Re-enter passport number"
                style={formControlStyle}
                value={confirmPassportNumber}
                onChange={(e) => {
                  setConfirmPassportNumber(e.target.value);
                  setConfirmPassportNumberError("");
                }}
                onBlur={(e) => {
                  if (e.target.value && e.target.value !== passportNumber) {
                    setConfirmPassportNumberError(
                      "Passport numbers do not match."
                    );
                  }
                }}
              />
              {confirmPassportNumberError && (
                <div
                  style={{ color: "red", fontSize: "13px", marginTop: "2px" }}
                >
                  {confirmPassportNumberError}
                </div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Passport Issue Place <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter issue place"
                style={formControlStyle}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Passport Issue Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control mt-1"
                placeholder="Select date"
                style={formControlStyle}
                value={passportIssueDate}
                onChange={(e) => {
                  setPassportIssueDate(e.target.value);
                  setPassportIssueDateError("");
                }}
                onBlur={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const today = new Date();
                  if (selectedDate > today) {
                    setPassportIssueDateError(
                      "Passport Issue Date cannot be in the future."
                    );
                  }
                }}
              />
              {passportIssueDateError && (
                <div
                  style={{ color: "red", fontSize: "13px", marginTop: "2px" }}
                >
                  {passportIssueDateError}
                </div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Passport Expiry Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control mt-1"
                placeholder="Select date"
                style={formControlStyle}
                value={passportExpiryDate}
                onChange={(e) => {
                  setPassportExpiryDate(e.target.value);
                  setPassportExpiryDateError("");
                }}
                onBlur={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const today = new Date();
                  // Remove time part for accurate comparison
                  selectedDate.setHours(0, 0, 0, 0);
                  today.setHours(0, 0, 0, 0);
                  if (selectedDate < today) {
                    setPassportExpiryDateError(
                      "Passport Expiry Date cannot be in the past."
                    );
                  }
                }}
              />
              {passportExpiryDateError && (
                <div
                  style={{ color: "red", fontSize: "13px", marginTop: "2px" }}
                >
                  {passportExpiryDateError}
                </div>
              )}
            </div>
          </div>

          <h2
            className="fs-6 fw-semibold mb-3 section-heading"
            style={{ fontSize: "18px" }}
          >
            Contact Information
          </h2>

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Email ID <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email address"
                style={formControlStyle}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                onBlur={(e) => {
                  const pattern =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  if (e.target.value && !pattern.test(e.target.value)) {
                    setEmailError("Please enter a valid email address.");
                  }
                }}
              />
              {emailError && (
                <div
                  style={{ color: "red", fontSize: "13px", marginTop: "2px" }}
                >
                  {emailError}
                </div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                className="form-control mt-1"
                placeholder="Enter phone number"
                style={formControlStyle}
                pattern="^[0-9]+$"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError("");
                }}
                onBlur={(e) => {
                  const pattern = /^[0-9]+$/;
                  if (e.target.value && !pattern.test(e.target.value)) {
                    setPhoneError("Please enter valid phone number only.");
                  }
                }}
              />
              {phoneError && (
                <div
                  style={{ color: "red", fontSize: "13px", marginTop: "2px" }}
                >
                  {phoneError}
                </div>
              )}
            </div>
          </div>

          <h2
            className="fs-6 fw-semibold mb-3 section-heading"
            style={{ fontSize: "18px" }}
          >
            Additional information
          </h2>

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Marital Status
              </label>
              <select
                className="form-select mt-1"
                style={{ ...formControlStyle, height: "42px" }}
              >
                <option value="" disabled selected>
                  Select marital status
                </option>
                <option value="married">Married</option>
                <option value="single">Single</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                Visa Type
              </label>
              <select
                className="form-select mt-1"
                style={{ ...formControlStyle, height: "42px" }}
              >
                <option value="" disabled selected>
                  Select visa type
                </option>
                <option value="workvisa">Work Visa</option>
                <option value="familyvisa">Family Visa</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label
                className="form-label mb-1 fw-bold"
                style={{ fontSize: "14px" }} // Labels 14px
              >
                National ID (Aadhar)
              </label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter national ID"
                style={formControlStyle}
                pattern="^[0-9]+$"
                value={nationalId}
                onChange={(e) => {
                  setNationalId(e.target.value);
                  setNationalIdError("");
                }}
                onBlur={(e) => {
                  const pattern = /^[0-9]+$/;
                  if (e.target.value && !pattern.test(e.target.value)) {
                    setNationalIdError("Please enter valid ID.");
                  }
                }}
              />
              {nationalIdError && (
                <div
                  style={{ color: "red", fontSize: "13px", marginTop: "2px" }}
                >
                  {nationalIdError}
                </div>
              )}
            </div>
          </div>

          <div className="mb-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="confirmCheck"
                required
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

          <div className="d-flex justify-content-end align-items-center gap-3">
            <button
              className="btn btn-light d-flex justify-content-center align-items-center"
              style={{
                border: "1.5px solid #D8CEFF",
                borderRadius: "8px",
                width: "100px",
                height: "40px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary d-flex justify-content-center align-items-center"
              style={{
                border: "1.5px solid #D8CEFF",
                borderRadius: "8px",
                width: "200px",
                height: "40px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => router.push("/medical/order-summary")}
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
