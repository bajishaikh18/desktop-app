import React, { useState, useRef } from "react";
import {
  Form,
  Button,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../app/page.module.scss";
import "../app/globals.scss";
import DatePicker from "react-datepicker";
import ProfessionalDetails from "./ProfessionalDetails";
import UploadResumeModal from "./UploadResume";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { signup } from "@/apis/auth";
import { VerifyOtp } from "./VerifyOtp";
import Image from "next/image";

const RegistrationPopup = ({ handleClose, backToSignIn }: { handleClose: () => void,backToSignIn:()=>void }) => {
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
  const [currentScreen, setCurrentScreen] = useState(0);
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
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
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
        toast.success("Registered successfully!", {
          position: "top-center",
        });
        handleScreenChange(1);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Failed to register. Please try again.", {
        position: "top-center",
      });
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
    try {
      setLoadingVerifyOtp(true);
      // await verifyOtp(otp.join(''),formData.phone);
      toast.success("OTP verified successfully!", { position: "top-center" });
      setCurrentScreen(2);
    } catch (e: any) {
      if (e.status === 401) {
        toast.error("OTP entered is invalid", { position: "top-center" });
      } else {
        toast.error("Something went wrong. Please try again later", {
          position: "top-center",
        });
      }
    } finally {
      setLoadingVerifyOtp(false);
    }
  };

  return (
    <>
      {
        {
          0: (
            <>
              <Form className="register-form">
                <Form.Group className="form-group" controlId="formFirstName">
                  <Form.Label>{t("firstname")}</Form.Label>
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

                <Form.Group className="form-group" controlId="formLastName">
                  <Form.Label>{t("lastname")}</Form.Label>
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

                <Form.Group className="form-group" controlId="formDOB">
                  <Form.Label>{t("dateofbirth")}</Form.Label>
                  
                  {/* {datePickerVisible && ( */}
                    {/* <div className={styles.datePickerContainer}> */}
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                        placeholderText="DD-MM-YYYY"
                        popperClassName="custom-date-picker"
                        customInput={ <Form.Control
                          type="text"
                          placeholder="YYYY-MM-DD"
                          value={formData.dob}
                          onChange={handleInputChange}
                          readOnly
                          isInvalid={!!formErrors.dob}
                        />}
                        className={styles.datePicker}
                        popperPlacement="bottom"
                        onClickOutside={() => setDatePickerVisible(false)}
                      />
                       <Image
                      src="/mingcute_calendar-line.png"
                      alt="Calendar"
                      width={18}
                      height={20}
                      className={styles.calendarIcon}
                      onClick={() => setDatePickerVisible(!datePickerVisible)}
                    />
                    {/* </div> */}
                  {/* )} */}
                </Form.Group>

                <Form.Group className="form-group" controlId="formPhone">
                  <Form.Label>{t("Phone")}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Enter mobile number"
                      name="phone"
                      value={formData.phone}
                      className={styles.contactInput}
                      onChange={handlePhoneChange}
                      isInvalid={!!formErrors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.phone}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="form-group" controlId="formEmail">
                  <Form.Label>{t("email")}</Form.Label>
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
                  margin:"10px 0px"
                }}
                disabled={loadingRegister}
              >
                {loadingRegister ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Registering...
                  </>
                ) : (
                  <> {t("register")}</>
                )}{" "}
              </Button>

              <div className={`${styles.resendText}`}>
                {" "}
                {t("already have an account?")}
                <a onClick={backToSignIn} className="text-primary">
                  {t("sign_in")}
                </a>
              </div>
            </>
          ),
          1: (
            <VerifyOtp
              phone={formData.phone}
              successAction={() => handleScreenChange(2)}
            />
          ),
          2: (
            <ProfessionalDetails
              onSubmit={(screen) => handleScreenChange(screen)}
            />
          ),
          3: <UploadResumeModal handleClose={handleClose} />,
        }[currentScreen]
      }
    </>
  );
};

export default RegistrationPopup;
