import React, { useState, useRef } from "react";
import { Modal, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import styles from "../app/page.module.scss";
import { loginWithPhone } from "@/apis/Auth";  
import RegistrationPopup from "./Registration";
import "../app/globals.scss";
import { useTranslations } from "next-intl";

interface LoginPopupProps {
  show: boolean;
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ show, onClose }) => {
  const t = useTranslations("Authentication");
  const [phone, setPhone] = useState<string>("");
  const [otpVisible, setOtpVisible] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const handleSendOtp = async () => {
    setLoading(true); 
    setPhoneError(null);
    setOtpError(null); 
  
    try {
      if (phone.length < 10) {
        setPhoneError("Invalid mobile number");
        return;
      }
  
       const response = await loginWithPhone(phone);
      if (response) {
        setCurrentScreen(1);
         } else {
        setPhoneError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setPhoneError("An error occurred while sending OTP.");
    } finally {
      setLoading(false); 
    }
  };
  
  const handleOtpChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;
    
    if (target instanceof HTMLInputElement) {
      const value = target.value;
  
      if (/^\d$/.test(value)) {
        otpInputRefs.current[index]!.value = value;
        if (index < otpInputRefs.current.length - 1) {
          otpInputRefs.current[index + 1]?.focus();
        }
      }
    }
  };
  
  const handleResendOtp = () => {
    alert("OTP resent");
  };

  const handleVerifyOtp = () => {
    const otp = otpInputRefs.current.map((input) => input?.value).join("");
    if (otp.length !== 6) {
      setOtpError("Invalid OTP. Please try again.");
      return;
    }
    setOtpError(null);
    alert("OTP Verified");
  };

  const handleRegisterClick = () => {
    setCurrentScreen(2);
  };

  if (!show && !showRegistration) return null;

  return (
    <>
      {show && !showRegistration && (
        <Modal show={true} onHide={onClose} centered>
          <Modal.Header className={styles.modalHeader} closeButton></Modal.Header>
          <Modal.Body className={`${otpVisible ? styles.visibleClass : ''} ${styles.modalContainer}`}>
            <div className={styles.logoContainer}>
              <img
                src="/logo-popup.png"
                alt="Wonderly Logo"
                className={styles.logoImage}
              />
            </div>
            {
              {
                0: (
                  <>
                    <Modal.Title className={styles.modalTitle1}>
                      {t('login')}
                    </Modal.Title>
                    <Form>
                      <InputGroup>
                        <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder={t('mobileNo')}
                          className={styles.contactInput}
                          value={phone}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPhone(e.target.value)
                          }
                          isInvalid={!!phoneError}
                        />
                        <Form.Control.Feedback type="invalid">
                          {phoneError}
                        </Form.Control.Feedback>
                      </InputGroup>

                      <Button
                        variant="primary"
                        className={`w-100 ${styles.sendOtpButton}`}
                        onClick={handleSendOtp}
                        disabled={loading} 
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          t('SendOtp')
                        )}
                      </Button>
                      <div className={styles.loginLinks}>
                        <a href="#" className={styles.helperLinks}></a>
                        <a href="#" className={styles.helperLinks} onClick={handleRegisterClick}>
                          {t('register')}
                        </a>
                      </div>
                      <div className={styles.continueWithoutLogin}>
                        <a href="#" className={styles.helperLinks}>
                          {t('continue with out login')}
                        </a>
                      </div>
                    </Form>
                  </>
                ),
                1: (
                  <>
                    <Modal.Title className={styles.modalTitle2}>
                      OTP Verification
                    </Modal.Title>
                    <Form>
                      <Form.Group className="mb-3" controlId="otp">
                        <Form.Label style={{ marginLeft: "90px" }}>
                          {t('please enter the OTP sent to')} <br />
                          <span className={styles.phoneNumberLabel}>+91 {phone}</span>
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
                              onChange={(e) => handleOtpChange(index, e)}
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
                          <a href="#" onClick={handleResendOtp} className="text-primary">
                            {t('resend otp')}
                          </a>
                        </p>
                        <Button
    variant="primary"
    onClick={handleVerifyOtp} style={{  fontSize: "8px",  padding: "1px 2px",  lineHeight: "1",  marginBottom: "-22px",}}
    disabled={otpLoading} 
  >  {otpLoading ? (
      <>
        <Spinner animation="border" size="sm" />
        <span style={{ marginLeft: '5px' }}>Verifying...</span>
      </> ) : (   "Verify OTP"
    )}
  </Button>
                      </div>
                    </Form>
                  </>
                ),
                2: <RegistrationPopup />,
              }[currentScreen]
            }
          </Modal.Body>
          <Modal.Footer>
            <div className={styles.loginFooter}>
              <small className="w-100">
                Copyright © 2024 Adobe. All rights reserved.
                <br />
                <span className="text-black">Terms of Use</span>
                <span className="text-black">Privacy</span>
                <span className="text-black">Do not sell or share my personal information</span>
              </small>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default LoginPopup;
