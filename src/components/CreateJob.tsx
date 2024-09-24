import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from '../app/page.module.scss';
import UploadResumeModal from './UploadResume'; 
import '../app/globals.scss'; 

interface RegistrationModalProps {
  show: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ show, onClose }) => {
  const [formData, setFormData] = React.useState({
    currentJobTitle: '',
    industry: '',
    experienceYears: '',
    gulfExperience: '',
    currentState: ''
  });

  const [errors, setErrors] = React.useState({
    currentJobTitle: '',
    industry: '',
    experienceYears: '',
    gulfExperience: '',
    currentState: ''
  });

  const [showUploadModal, setShowUploadModal] = React.useState(false); 

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); 
  };

  const handleSubmit = () => {
    const newErrors = {
      currentJobTitle: formData.currentJobTitle ? '' : 'Job title is required.',
      industry: formData.industry ? '' : 'Industry is required.',
      experienceYears: formData.experienceYears ? '' : 'Experience years are required.',
      gulfExperience: formData.gulfExperience ? '' : 'Gulf experience is required.',
      currentState: formData.currentState ? '' : 'Current state is required.'
    };

    setErrors(newErrors);

    if (
      formData.currentJobTitle &&
      formData.industry &&
      formData.experienceYears &&
      formData.gulfExperience &&
      formData.currentState
    ) {
      setShowUploadModal(true); 
    }
  };

  if (!show) return null;

  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header className={styles.modalHeader} closeButton>
        </Modal.Header>
        <Modal.Body className={styles.modalBodyCreate}>
          <div className={styles.logoContainer}>
            <img src="/logo-popup.png" alt="Wonderly Logo" className={styles.logoImage} />
          </div>
        
          <Form>
          <Form.Group className="mb-3">
  <Form.Label>Current Job Title</Form.Label>
  <div className={styles.selectContainer}>
    <Form.Control
      as="select"
      name="currentJobTitle"
      value={formData.currentJobTitle}
      onChange={handleInputChange}
      isInvalid={!!errors.currentJobTitle}
      className={styles.selectInput} 
    >
      <option value="">Select your job title</option>
      <option value="Software Engineer">Software Engineer</option>
      <option value="Project Manager">Project Manager</option>
      <option value="Designer">Designer</option>
    </Form.Control>
    <img src="/Icon.png" alt="Job Icon" className={styles.iconImage} />
    <Form.Control.Feedback type="invalid">
      {errors.currentJobTitle}
    </Form.Control.Feedback>
  </div>
</Form.Group>


<Form.Group className="mb-3">
  <Form.Label>Industry</Form.Label>
  <div className={styles.selectContainer}>
    <Form.Control
      as="select"
      name="industry"
      value={formData.industry}
      onChange={handleInputChange}
      isInvalid={!!errors.industry}
      className={styles.selectInput}
    >
      <option value="">Select Industry</option>
      <option value="IT">IT</option>
      <option value="Construction">Construction</option>
      <option value="Healthcare">Healthcare</option>
    </Form.Control>
    <img src="/Icon.png" alt="Industry Icon" className={styles.iconImage} />
    <Form.Control.Feedback type="invalid">
      {errors.industry}
    </Form.Control.Feedback>
  </div>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Total Number of Years</Form.Label>
  <div className={styles.selectContainer}>
    <Form.Control
      as="select"
      name="experienceYears"
      value={formData.experienceYears}
      onChange={handleInputChange}
      isInvalid={!!errors.experienceYears}
      className={styles.selectInput}
    >
      <option value="">Select Years of Experience</option>
      <option value="0-2">0-2</option>
      <option value="3-5">3-5</option>
      <option value="6-10">6-10</option>
    </Form.Control>
    <img src="/Icon.png" alt="Experience Icon" className={styles.iconImage} />
    <Form.Control.Feedback type="invalid">
      {errors.experienceYears}
    </Form.Control.Feedback>
  </div>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Do you have Gulf Experience?</Form.Label>
  <div className={styles.selectContainer}>
    <Form.Control
      as="select"
      name="gulfExperience"
      value={formData.gulfExperience}
      onChange={handleInputChange}
      isInvalid={!!errors.gulfExperience}
      className={styles.selectInput}
    >
      <option value="">Select an option</option>
      <option value="No">No</option>
      <option value="Yes">Yes</option>
    </Form.Control>
    <img src="/Icon.png" alt="Gulf Experience Icon" className={styles.iconImage} />
    <Form.Control.Feedback type="invalid">
      {errors.gulfExperience}
    </Form.Control.Feedback>
  </div>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Current State</Form.Label>
  <div className={styles.selectContainer}>
    <Form.Control
      as="select"
      name="currentState"
      value={formData.currentState}
      onChange={handleInputChange}
      isInvalid={!!errors.currentState}
      className={styles.selectInput}
    >
      <option value="">Select State</option>
      <option value="Maharashtra">Maharashtra</option>
      <option value="Delhi">Delhi</option>
      <option value="Uttar Pradesh">Uttar Pradesh</option>
    </Form.Control>
    <img src="/Icon.png" alt="State Icon" className={styles.iconImage} />
    <Form.Control.Feedback type="invalid">
      {errors.currentState}
    </Form.Control.Feedback>
  </div>
</Form.Group>


          </Form>
          <Button
  variant="primary"  onClick={handleSubmit}  style={{fontSize: '8px', padding: '1px 2px',lineHeight: '1',marginBottom: '-40px',marginTop: '-20px'
  
  }}
> Submit
</Button>
        </Modal.Body>
        
        <Modal.Footer>
          <div className={styles.loginFooter}>
            <small className="w-100 text-center">
              Copyright © 2024 Adobe. All rights reserved.
              <br />
              <span className="text-black">Terms of Use</span>
              <span className="text-black">Privacy</span>
              <span className="text-black">Do not sell or share my personal information</span>
            </small>
          </div>
        </Modal.Footer>
      </Modal>

      <UploadResumeModal show={showUploadModal} onClose={() => setShowUploadModal(false)} />
    </>
  );
};

export default RegistrationModal;
