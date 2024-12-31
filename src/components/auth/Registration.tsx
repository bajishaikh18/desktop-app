import React, { useState} from "react";
import {
  Form,
  Button,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../app/page.module.scss";
import DatePicker from "react-datepicker";
import ProfessionalDetails from "./ProfessionalDetails";
import UploadResumeModal from "./UploadResume";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { signup } from "@/apis/auth";
import { VerifyOtp } from "./VerifyOtp";
import Image from "next/image";

const phoneRegex = /^[0-9]{10}$/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const today = new Date();

const eighteenYearsAgo = new Date(new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
).setHours(0,0,0,0));

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
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
  });
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    if (value && emailRegex.test(value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }else{
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Enter a valid email",
      }));
    }
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const value = e.target.value.replace(/[^0-9]/g, "");
   setFormData({ ...formData, phone: value });
    if (value.length === 10 && phoneRegex.test(value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Enter a valid 10 digit phone number",
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
      firstName: firstName ? "" : t('firstname_error'),
      lastName: lastName ? "" : t('lastname_error'),
      dob: dob ? new Date(dob).getTime() > eighteenYearsAgo.getTime() ? t('dob_error_18'): "" : t('dob_error'),
      phone: phone ? !phoneRegex.test(phone) ? t('phone_valid_error') :'' : t('phone_error'),
      email: email && emailRegex.test(email) ?  "" : t('email_valid_error'),
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
        toast.success(t('success'));
        handleScreenChange(1);
      }
    } catch (error:any) {
      if (error?.status === 400) {
        toast.error("User already exisits with the given phone number. Please login");
      }else{
        toast.error(t('submit_error'));
      }
    } finally {
      setLoadingRegister(false);
    }
  };

  const handleScreenChange = (screen: number) => {
    setCurrentScreen(screen);
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
                    placeholder={t('enter_firstname')}
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
                    placeholder={t('enter_lastname')}

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
                    <div style={{position:'relative'}}>
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
                        maxDate={eighteenYearsAgo}
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
                      {formErrors.dob && (
                        <Form.Text className="error">{formErrors.dob}</Form.Text>
                      )}
                    {/* </div> */}
                  {/* )} */}
                  </div>
                </Form.Group>
              

                <Form.Group className="form-group" controlId="formPhone">
                  <Form.Label>{t("Phone")}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder={t('enter_mobileNo')}

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
                    placeholder={t('enter_email')}
                    value={formData.email}
                    onChange={handleEmailChange}
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
