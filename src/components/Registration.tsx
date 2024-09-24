import React, { useState, useRef } from 'react';
import { Modal, Form, Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../app/page.module.scss';  
import '../app/globals.scss'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { FaCalendarAlt } from 'react-icons/fa'; 
import RegistrationModal from './CreateJob'; 

interface RegistrationPopupProps {
  show: boolean;
  onClose: () => void;
}

const RegistrationPopup: React.FC<RegistrationPopupProps> = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '', 
    phoneNumber: '',
    email: ''
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [otpVisible, setOtpVisible] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [otpError, setOtpError] = useState<string | null>(null);
  const [registrationModalVisible, setRegistrationModalVisible] = useState<boolean>(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      setFormData((prevData) => ({ ...prevData, dob: formattedDate }));
    }
    setDatePickerVisible(false);
  };

  const handleRegisterClick = () => {
    const { firstName, lastName, dob, phoneNumber, email } = formData;

    if (!firstName || !lastName || !dob || !phoneNumber || !email) {
      alert("All fields are required.");
      return;
    }

    console.log("Register button clicked", formData);
    setOtpVisible(true);
  };

  const handleOtpChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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
    console.log("OTP submitted:", otp.join(''));
    setRegistrationModalVisible(true);
  };

  const handleResendOtp = () => {
    console.log("Resend OTP");
  };

  if (!show) return null;

  return (
    <>
      <Modal show={show} onHide={() => {
        if (otpVisible) {
          setOtpVisible(false); 
        } else {
          onClose(); 
        }
      }} centered>
         <Modal.Header className={styles.modalHeader} closeButton>
         </Modal.Header>
        <Modal.Body className={styles.modalBodyRegister} >
          {otpVisible ? (
            <>
             <Modal.Title className={styles.modalTitle3}>OTP Verification</Modal.Title>
              <Form>
                <Form.Group className="mb-3" controlId="otp">
                  <Form.Label style={{ marginLeft: '90px' }}>    
                    Please enter the OTP sent to <br />
                    <span className={styles.phoneNumberLabel}>+91 {formData.phoneNumber}</span>
                  </Form.Label>
                  <div className={styles.otpInputs}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Form.Control
                        key={index}
                        type="text"
                        maxLength={1}
                        className={styles.otpInput}
                        placeholder="0"
                        ref={(el: HTMLInputElement | null) => { otpInputRefs.current[index] = el; }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOtpChange(index, e)}
                        isInvalid={!!otpError}
                      />
                    ))}
                  </div>
                  <Form.Control.Feedback type="invalid">{otpError}</Form.Control.Feedback>
                </Form.Group>
                <div className="text-center">
                  <p className={`${styles.textMuted} text-muted`}>
                    Didn&apos;t get OTP? &nbsp;
                    <a href="#" onClick={handleResendOtp} className="text-primary">
                      Resend OTP
                    </a>
                  </p>
                
                  <Button variant="primary" onClick={handleVerifyOtp}   style={{  fontSize: '8px', 
    padding: '1px 2px',  lineHeight: '1',marginBottom: '-22px' }}>
  Verify OTP
</Button>


                </div>
              </Form>
            </>
          ) : (
            <>
              <div className={styles.logoContainer}>
                <img src="/logo-popup.png" alt="Wonderly Logo" className={styles.logoImage} />
             </div>
              <Form>
           
             
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
               
                </Form.Group>
                

                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDOB">
                  <Form.Label>Date of Birth</Form.Label>
                  <div className={styles.datePickerWrapper}>
                    <Form.Control
                      type="text"
                      name="dob"
                      placeholder="DD/MM/YYYY"
                      value={formData.dob}
                      onChange={handleInputChange}
                      readOnly
                    />
                    <span
                      className={styles.datePickerIcon}
                      onClick={() => setDatePickerVisible(!datePickerVisible)}
                    >
                      <FaCalendarAlt />
                    </span>
                    {datePickerVisible && (
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        className={styles.datePicker}
                        popperPlacement="bottom" 
                        onClickOutside={() => setDatePickerVisible(false)} 
                      />
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Enter mobile number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
              <div className="text-center mt-2" style={{ marginBottom: '-22px' }}> 
                <small
                  className={`${styles.registerText} text-primary`}
                  onClick={handleRegisterClick}
                  style={{ cursor: 'pointer' }}
                >
                  Register
                </small>
              </div>
             
            </>
          )}
           
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

      {registrationModalVisible && (
        <RegistrationModal show={registrationModalVisible} onClose={() => setRegistrationModalVisible(false)} />
      )}
    </>
  );
};

export default RegistrationPopup;
