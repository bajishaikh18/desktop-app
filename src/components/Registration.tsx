import React, { useState, useRef } from "react";
import { Modal, Form, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../app/page.module.scss";
import "../app/globals.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProfessionalDetails from "./ProfessionalDetails";
import UploadResumeModal from "./UploadResume";

const RegistrationPopup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: "",
    email: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [otpVisible, setOtpVisible] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpError, setOtpError] = useState<string | null>(null);
  const [registrationModalVisible, setRegistrationModalVisible] =
    useState<boolean>(false);
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: "",
    email: "",
  });
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^\+?91\s*/, "");
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
      setFormData((prevData) => ({ ...prevData, dob: formattedDate }));
    }
    setDatePickerVisible(false);
  };

  const handleRegisterClick = () => {
    const { firstName, lastName, dob, phoneNumber, email } = formData;
    const errors = {
      firstName: firstName ? "" : "Please enter your first name.",
      lastName: lastName ? "" : "Please enter your last name.",
      dob: dob ? "" : "Date of birth is required.",
      phoneNumber: phoneNumber ? "" : "Please enter your phone number.",
      email: email ? "" : "Please enter a valid email address.",
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    console.log("Register button clicked", formData);
    handleScreenChange(1);
  };

  const handleScreenChange = (screen: number) => {
    setCurrentScreen(screen);
  };

  const handleOtpChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
      if (value && index < 5 && otpInputRefs.current[index + 1]) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    console.log("OTP submitted:", otp.join(""));
    handleScreenChange(2);
  };

  const handleResendOtp = () => {
    console.log("Resend OTP");
  };

  return (
    <>
      {
        {
          0: (
            <>
              <Form>
                <Form.Group className="mb-2" controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    isInvalid={!!formErrors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    {formErrors.firstName}
                  </Form.Control.Feedback>{" "}
                </Form.Group>

                <Form.Group className="mb-2" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    isInvalid={!!formErrors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.lastName}
                  </Form.Control.Feedback>{" "}
                </Form.Group>

                <Form.Group className="mb-2" controlId="formDOB">
                  <Form.Label>Date of Birth</Form.Label>
                  <div className={styles.inputGroup}>
                    <Form.Control
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={formData.dob}
                      onChange={handleInputChange}
                      readOnly
                      isInvalid={!!formErrors.dob}
                    />
                    <img
                      src="/mingcute_calendar-line.png"
                      alt="Calendar"
                      className={styles.calendarIcon}
                      onClick={() => setDatePickerVisible(!datePickerVisible)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.dob}{" "}
                    </Form.Control.Feedback>
                  </div>
                  {datePickerVisible && (
                    <div className={styles.datePickerContainer}>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        inline
                        className={styles.datePicker}
                        popperPlacement="bottom"
                        onClickOutside={() => setDatePickerVisible(false)}
                      />
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-2" controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Row>
                    <Col>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type="text"
                          placeholder="Enter mobile number"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handlePhoneNumberChange}
                          isInvalid={!!formErrors.phoneNumber}
                          style={{ paddingLeft: "60px" }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            left: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#495057",
                            pointerEvents: "none",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          +91
                        </span>
                        <Form.Control.Feedback type="invalid">
                          {formErrors.phoneNumber}
                        </Form.Control.Feedback>
                      </div>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    isInvalid={!!formErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
              <Button
                variant="primary"
                onClick={handleRegisterClick}
                style={{
                  fontSize: "8px",
                  padding: "1px 2px",
                  lineHeight: "1",
                  marginBottom: "-22px",
                }}
              >
                {" "}
                Register{" "}
              </Button>
            </>
          ),
          1: (
            <>
              <Modal.Title className={styles.modalTitle3}>
                OTP Verification
              </Modal.Title>
              <Form>
                <Form.Group className="mb-3" controlId="otp">
                  <Form.Label style={{ marginLeft: "90px" }}>
                    Please enter the OTP sent to <br />
                    <span className={styles.phoneNumberLabel}>
                      +91 {formData.phoneNumber}
                    </span>
                  </Form.Label>
                  <div className={styles.otpInputs}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Form.Control
                        key={index}
                        type="text"
                        maxLength={1}
                        className={styles.otpInput}
                        placeholder="0"
                        ref={(el: HTMLInputElement | null) => {
                          otpInputRefs.current[index] = el;
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleOtpChange(index, e)
                        }
                        isInvalid={!!otpError}
                      />
                    ))}
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {otpError}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="text-center">
                  <p className={`${styles.textMuted} text-muted`}>
                    Didn&apos;t get OTP? &nbsp;
                    <a
                      href="#"
                      onClick={handleResendOtp}
                      className="text-primary"
                    >
                      Resend OTP
                    </a>
                  </p>
                  <Button
                    variant="primary"
                    onClick={handleVerifyOtp}
                    style={{
                      fontSize: "8px",
                      padding: "1px 2px",
                      lineHeight: "1",
                      marginBottom: "-22px",
                    }}
                  >
                    Verify OTP
                  </Button>
                </div>
              </Form>
            </>
          ),
          2: (
            <ProfessionalDetails
              onSubmit={(screen) => handleScreenChange(screen)}
            />
          ),
          3: (
            <UploadResumeModal
              onSubmit={(screen) => handleScreenChange(screen)}
            />
          ),
        }[currentScreen]
      }
    </>
  );
};

export default RegistrationPopup;
