import React, { useState, useRef } from "react";
import { Modal, Form, Col, Row, Button, Spinner } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../app/page.module.scss";
import "../app/globals.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProfessionalDetails from "./ProfessionalDetails";
import UploadResumeModal from "./UploadResume";
import { useTranslations } from "next-intl";
import { signup } from "@/apis/auth";

const RegistrationPopup = ({handleClose}:{handleClose:()=>void}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
  });
  const t = useTranslations("Register");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState(3);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpError, setOtpError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
  });
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false); 
  const [loadingVerifyOtp, setLoadingVerifyOtp] = useState<boolean>(false); 
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^\+?91\s*/, "");
    setFormData({ ...formData, phone: value });

    if (value) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "",
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        setFormData((prevData) => ({ ...prevData, dob: formattedDate }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            dob: "",
        }));
    }
    setDatePickerVisible(false);
};


  const handleRegisterClick = async () => {
    const { firstName, lastName, dob, phone, email } = formData;
    const errors = {
      firstName: firstName ? "" : "Enter your first name.",
      lastName: lastName ? "" : "Enter your last name.",
      dob: dob ? "" : "Date of birth is required.",
      phone: phone ? "" : "Enter your phone number.",
      email: email ? "" : "Enter a valid email address.",
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    setLoadingRegister(true); 
    try {
      const response = await signup({
        firstName,
        lastName,
        dob,
        phone,
        email,
      });

      console.log("API response:", response);

      if (response.message) {
        alert:"hi"
        handleScreenChange(1);
      }
      
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setLoadingRegister(false); 
    }
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

  const handleVerifyOtp = async () => {
    setLoadingVerifyOtp(true); 
    console.log("OTP submitted:", otp.join(""));
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    handleScreenChange(2); 
    setLoadingVerifyOtp(false); 
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
                  <Form.Label>{t('firstname')}</Form.Label>
                  <Form.Control
                    type= "text"
                    name= "firstName"
                   placeholder = "Enter first name"
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
                  <Form.Label>{t('lastname')}</Form.Label>
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
        <Form.Label>{t('dateofbirth')}</Form.Label>
        <div className={styles.inputGroup}>
          <Form.Control
            type="text"
            placeholder="YYYY-MM-DD"
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
              dateFormat="yyyy-MM-dd" 
              inline
              className={styles.datePicker}
              popperPlacement="bottom"
              onClickOutside={() => setDatePickerVisible(false)}
            />
          </div>
        )}
      </Form.Group>

                <Form.Group className="mb-2" controlId="formPhone">
                  <Form.Label>{t('Phone')}</Form.Label>
                  <Row>
                    <Col>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type="text"
                          placeholder="Enter mobile number"
                          name="phone"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          isInvalid={!!formErrors.phone}
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
                          {formErrors.phone}
                        </Form.Control.Feedback>
                      </div>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formEmail">
                  <Form.Label>{t('email')}</Form.Label>
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
                  disabled={loadingRegister} 
                >
                  {loadingRegister ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      {' '}Registering...
                    </>
                  ) : (
                    'Register'
                  )} </Button>
             
              <div
  style={{  marginTop: "30px", marginBottom: "-25px", textAlign: "center", fontSize: "14px",   }}  > already have an account? <a href="#" className="text-primary">{t('signin')}</a>
</div>

            </>
          ),
          1: (
            <>
              <Modal.Title className={styles.modalTitle3}>
              {t(' otp verification')}
              </Modal.Title>
              <Form>
                <Form.Group className="mb-3" controlId="otp">
                  <Form.Label style={{ marginLeft: "90px" }}>
                  {t('please enter the OTP sent to')} <br />
                    <span className={styles.phoneNumberLabel}>
                      +91 {formData.phone}
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
                       {t('resend otp')}
                    </a>
                  </p>
                  <Button
                  variant="primary"
                  onClick={handleVerifyOtp}
                  disabled={loadingVerifyOtp} 
                >
                  {loadingVerifyOtp ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      {' '}Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
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
              handleClose={handleClose}
            />
          ),
        }[currentScreen]
      }
    </>
  );
};

export default RegistrationPopup;