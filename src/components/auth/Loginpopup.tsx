import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import styles from "../../app/page.module.scss";
import { loginWithPhone } from "@/apis/auth";  
import RegistrationPopup from "./Registration";
import { useTranslations } from "next-intl";
import toast  from "react-hot-toast";
import { VerifyOtp } from "./VerifyOtp";

interface LoginPopupProps {
  show: boolean;
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ show, onClose }) => {
  const t = useTranslations("Authentication");
  const [phone, setPhone] = useState<string>("");
  const [otpVisible, setOtpVisible] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendOtp = async () => {
    setLoading(true); 
    setPhoneError(null);
  
    try {
      if (phone.length < 10) {
        setPhoneError("Invalid mobile number");
        toast.error("Invalid mobile number", { position: "top-center" });
        return;
      }
  
      const response = await loginWithPhone(phone);
      if (response) {
        setCurrentScreen(1);
        toast.success("OTP sent successfully!", { position: "top-center" }); 
      } else {
        toast.error("Failed to send OTP. Please try again.",  { position: "top-center" }); 
      }
    } catch (error:any) {
      if([400,404].includes(error.status)){
        toast.error('Looks like your the number is not registered with us')
      }else{
        toast.error("An error occurred while sending OTP.",  { position: "top-center" }); 
      }
    } finally {
      setLoading(false); 
    }
  };
  
  const handleClose = ()=>{
    setCurrentScreen(0)
    onClose();
  }

  const handleRegisterClick = () => {
    setCurrentScreen(2);
  };

  if (!show && !showRegistration) return null;

  return (
    <>

      {show && !showRegistration && (
        <Modal show={true} onHide={handleClose} centered>
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
                          <>{t('sendotp')}</>
                        )}
                      </Button>
                      <div className={styles.loginLinks}>
                        <a href="#" className={styles.helperLinks}></a>
                        <a href="#" className={styles.helperLinks} onClick={handleRegisterClick}>
                          {t('register')}
                        </a>
                      </div>
                      <div className={styles.continueWithoutLogin}>
                        <a className={styles.helperLinks} onClick={handleClose}>
                          {t('continue_with_out_login')}
                        </a>
                      </div>
                    </Form>
                  </>
                ),
                1:<VerifyOtp phone={phone} successAction={onClose}/>,
                2: <RegistrationPopup  handleClose={onClose} backToSignIn={()=>setCurrentScreen(0)}/>,
              }[currentScreen]
            }
          </Modal.Body>
          <Modal.Footer>
            <div className={styles.loginFooter}>
                Copyright © 2024 Adobe. All rights reserved.
               
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default LoginPopup;
