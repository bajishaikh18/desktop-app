import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import styles from "../../app/page.module.scss";
import { loginWithPhone } from "@/apis/auth";  
import RegistrationPopup from "./Registration";
import { useTranslations } from "next-intl";
import toast  from "react-hot-toast";
import { VerifyOtp } from "./VerifyOtp";
import Image from "next/image";

interface LoginPopupProps {
  show: boolean;
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ show, onClose }) => {
  const t = useTranslations("Authentication");
  const [phone, setPhone] = useState<string>("");
  const [otpVisible] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showRegistration] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendOtp = async () => {
    setLoading(true); 
    setPhoneError(null);
  
    try {
      if (phone.length < 10) {
        setPhoneError(t("invalid_number"));
        toast.error(t("invalid_number"), { position: "top-center" });
       return;
      }
  
      const response = await loginWithPhone(phone);
      if (response) {
        setCurrentScreen(1);
        toast.success(t("otp_sent"), { position: "top-center" }); 
      } else {
        toast.error(t("failed_send"),  { position: "top-center" }); 
      }
    } catch (error:any) {
      if([400,404].includes(error.status)){
        toast.error(t('number_registered'))
      }else{
        toast.error(t("error_occurred"),  { position: "top-center" }); 
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
              <Image
                src="/logo.png"
                alt="boon Logo"
                width={180}
                height={100}
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
                1:<VerifyOtp phone={phone} successAction={()=>{location.reload();onClose();}}/>,
                2: <RegistrationPopup  handleClose={onClose} backToSignIn={()=>setCurrentScreen(0)}/>,
              }[currentScreen]
            }
          </Modal.Body>
          <Modal.Footer>
            <div className={styles.loginFooter}>
                Copyright © {new Date().getFullYear()} Boon.ai. All rights reserved.
               
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default LoginPopup;
