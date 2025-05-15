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
        margin: "5rem 260px 2rem 260px",
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
              />
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
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter position"
                style={formControlStyle}
              />
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
              />
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
              />
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

          <div className="mb-4">
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
                I Confirm that the information given in this form is true,
                complete and accurate. Please note that the actual charges for
                Wafid (GAMCA Medical Slip Generation) is USD 10$ which is
                equivalent to INR 880 apx including Foreign Currency Conversion
                and Bank Transfer charges. Rs 120 is the Boon.ai platform
                convenience Fee. Please proceed if you agree to pay the charges
                as explained above.
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-3">
            <button
              className="btn btn-light"
              style={{
                border: "1.5px solid #D8CEFF",
                borderRadius: "8px",
                width: "100px",
                height: "40px",
              }}
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              style={{
                border: "1.5px solid #D8CEFF",
                borderRadius: "8px",
                width: "200px",
                height: "40px",
              }}
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
