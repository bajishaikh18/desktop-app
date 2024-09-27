import React, { useState, useRef } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../app/page.module.scss";
import "../app/globals.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { verifyOtp } from "@/apis/auth";
import { AuthUser, useAuthUserStore } from "@/stores/useAuthUserStore";
import { getTokenClaims } from "@/helpers/jwt";

export const VerifyOtp = ({
  phone,
  successAction,
}: {
  phone: string;
  successAction : () => void;
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);

  const t = useTranslations("Register");
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setAuthUser } = useAuthUserStore();

  const handleResendOtp = () => {
    toast.success("OTP resent!");
  };

  const handleVerifyOtp = async () => {
    try {
      setOtpLoading(true);
      const response = await verifyOtp(otp.join(""), phone);
      if (response.token) {
        localStorage.setItem("token", response.token);
        const user = getTokenClaims(response.token);
        setAuthUser(user as AuthUser);
        successAction();
      }
      toast.success("OTP verified successfully!");
    } catch (e: any) {
      if (e.status === 401) {
        toast.error("OTP entered is invalid", { position: "top-center" });
      } else {
        toast.error("Something went wrong. Please try again later", { position: "top-center" });
      }
    } finally {
      setOtpLoading(false);
    }
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

  return (
    <>
      <Modal.Title className={styles.modalTitle3}>
        {t("otpverification")}
      </Modal.Title>
      <Form>
        <Form.Group className="mb-3" controlId="otp">
          <Form.Label style={{ marginLeft: "90px" }}>
            {t("please_enter_the_OTP_sent_to")} <br />
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
            {t('didn&apos;tgetOTP?')} &nbsp;
            <a href="#" onClick={handleResendOtp} className="text-primary">
              {t("resendotp")}
            </a>
          </p>
          <Button
            variant="primary"
            onClick={handleVerifyOtp}
            disabled={otpLoading}
          >
            {otpLoading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Verifying...
              </>
            ) : (
              <>{t('Verifyotp')}</>
            )}
          </Button>
        </div>
      </Form>
    </>
  );
};
