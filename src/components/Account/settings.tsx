import React, { useState, useEffect } from 'react';
import styles from '../../components/Account/SettingsProfile.module.scss';
import { Form, Button, Card, InputGroup, Accordion } from 'react-bootstrap';
import { useAuthUserStore } from '../../stores/useAuthUserStore';
import AsyncSelect from 'react-select/async';
import Image from 'next/image';

interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  countryCode: string;
  dob: string;
  jobTitle: string;
  industry: string;
  experience: string;
  state: string;
}

interface SettingsProfileProps {
  onSave?: (updatedProfile: UserProfile) => void;
  onCancel?: () => void;
}

const SettingsProfile: React.FC<SettingsProfileProps> = () => {
  const { authUser } = useAuthUserStore(); 

  const [profile, setProfile] = useState<UserProfile>({
    firstName: authUser?.firstName || '',
    lastName: authUser?.lastName || '',
    phone: authUser?.phone || '',
    email: authUser?.email || '',
    countryCode: '+91',
    dob: authUser?.dob || '',
    jobTitle: authUser?.jobTitle || '',
    industry: authUser?.industry || '',
    experience: authUser?.experience || '',
    state: authUser?.state || '',
  });

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    jobTitle: '',
    industry: '',
    experience: '',
    state: ''
  });

  useEffect(() => {
    if (authUser) {
      setProfile({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        phone: authUser.phone,
        email: authUser.email,
        countryCode: '+91',
        dob: authUser.dob,
        jobTitle: authUser.jobTitle,
        industry: authUser.industry,
        experience: authUser.experience,
        state: authUser.state,
      });
    }
  }, [authUser]); 

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^\+?91\s*/, '');
    setProfile({ ...profile, phone: value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, email: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, dob: e.target.value });
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const validateForm = () => {
    const errors = {
      firstName: profile.firstName ? '' : 'First name is required',
      lastName: profile.lastName ? '' : 'Last name is required',
      phone: profile.phone ? '' : 'Phone is required',
      email: profile.email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(profile.email) ? '' : 'Enter a valid email',
      dob: profile.dob ? '' : 'Date of Birth is required',
      jobTitle: profile.jobTitle ? '' : 'Job title is required',
      industry: profile.industry ? '' : 'Industry is required',
      experience: profile.experience ? '' : 'Experience is required',
      state: profile.state ? '' : 'State is required',
    };

    return !Object.values(errors).some((error) => error);
  };

  return (
    <Card className={styles.settingsProfileCard}>
      <Card.Body>
        <div className={styles.settingsProfile}>
          <Form>
            <div className={styles.section}>
              <h3 onClick={() => toggleSection('personalDetails')}>
                Personal Details
                <Image
                  src="/setting.png"
                  alt="Settings"
                  width={16}
                  height={16}
                  style={{
                    right: '50px',
                    position: 'absolute',
                    display: 'inline-block',
                    cursor: 'pointer',
                    transform: openSection === 'personalDetails' ? 'rotate(180deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.3s ease',
                  }}
                />
              </h3>
              {openSection === 'personalDetails' && (
                <div>
                  <div className={`${styles.formRow} d-flex`}>
                    <Form.Group className="form-group"  style={{ flex: 1, marginRight: '10px' }}>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={profile.firstName}
                        placeholder="Enter First name"
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        className="inputField"
                        isInvalid={!!formErrors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-group" style={{ flex: 1 }}>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={profile.lastName}
                        placeholder="Enter Last name"
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        className="inputField"
                        isInvalid={!!formErrors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">{formErrors.lastName}</Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className={`${styles.formRow} d-flex`}>
                  <Form.Group className="form-group"  style={{ flex: 1, marginRight: '10px' }}>
    <Form.Label>Phone Number</Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter Mobile No"
      className={styles.contactInput}
      value={profile.phone ? `+91 ${profile.phone}` : ''} 
      onChange={handlePhoneChange}
      isInvalid={!!formErrors.phone}
    />
    <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
  </Form.Group>

  <Form.Group className="form-group" style={{ flex: 1 }}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={profile.email}
                        placeholder="Enter Email"
                        onChange={handleEmailChange}
                        className="inputField"
                        isInvalid={!!formErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className={styles.formRow}>
                  <Form.Group className="form-group" style={{ flex: 1 }}>
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="text"
                        value={profile.dob}
                        placeholder="YYYY-MM-DD"
                        onChange={handleDateChange}
                        className="inputField"
                        isInvalid={!!formErrors.dob}
                      />
                      <Form.Control.Feedback type="invalid">{formErrors.dob}</Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.section}>
              <h3 onClick={() => toggleSection('professionalDetails')}>
                Professional Details
                <Image
                  src="/setting.png"
                  alt="Settings"
                  width={16}
                  height={16}
                  style={{
                    right: '50px',
                    position: 'absolute',
                    display: 'inline-block',
                    cursor: 'pointer',
                    transform: openSection === 'professionalDetails' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease', 
                  }}
                />
              </h3>
              {openSection === 'professionalDetails' && (
                <div>
                  <div className={`${styles.formRow} d-flex`}>
                  <Form.Group className="form-group"  style={{ flex: 1, marginRight: '10px' }}>
                      <Form.Label>Job Title</Form.Label>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={() => {}}
                        value={profile.jobTitle}
                        onChange={(value) => handleChange('jobTitle', value as string)}
                        classNamePrefix="inputField"
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary25: 'rgba(246, 241, 255, 1)',
                            primary: '#0045E6',
                          },
                        })}
                      />
                      {formErrors.jobTitle && <div className="text-danger">{formErrors.jobTitle}</div>}
                    </Form.Group>

                    <Form.Group className="form-group" style={{ flex: 1 }}>
                      <Form.Label>Industry</Form.Label>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={() => {}}
                        value={profile.industry}
                        onChange={(value) => handleChange('industry', value as string)}
                        classNamePrefix="inputField"
                      />
                      {formErrors.industry && <div className="text-danger">{formErrors.industry}</div>}
                    </Form.Group>
                  </div>

                  <div className={`${styles.formRow} d-flex`}>
                  <Form.Group className="form-group"  style={{ flex: 1, marginRight: '10px' }}>
                      <Form.Label>Experience</Form.Label>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={() => {}}
                        value={profile.experience}
                        onChange={(value) => handleChange('experience', value as string)}
                        classNamePrefix="inputField"
                      />
                      {formErrors.experience && <div className="text-danger">{formErrors.experience}</div>}
                    </Form.Group>

                    <Form.Group className="form-group" style={{ flex: 1 }}>
                      <Form.Label>State</Form.Label>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={() => {}}
                        value={profile.state}
                        onChange={(value) => handleChange('state', value as string)}
                        classNamePrefix="inputField"
                      />
                      {formErrors.state && <div className="text-danger">{formErrors.state}</div>}
                    </Form.Group>
                  </div>
                </div>
              )}
            </div>

           
            {['Account Settings', 'Notification Preference', 'Language'].map((section) => (
              <div key={section} className={`${styles.section} ${styles.collapsible}`} onClick={() => toggleSection(section)}>
                <h3>
                  {section}
                  <Image
                    src="/Icon.png"
                    alt="Section Icon"
                    width={16}
                    height={16}
                    style={{
                      position: 'absolute',
                      right: '50px',
                      display: 'inline-block',
                      transform: openSection === section ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </h3>
                {openSection === section && (
                  <div>
                   
                    {section === 'Account Settings' && <div>Account settings content goes here</div>}
                    {section === 'Notification Preference' && <div>Notification preference content goes here</div>}
                    {section === 'Language' && <div>Language selection content goes here</div>}
                  </div>
                )}
              </div>
            ))}
               <div className={styles.jobActions}>
           <Button  className={styles.saveJobButton}
                          variant="secondary"
                         
                        > cancel
                        </Button>
                         <Button
                        className={styles.easyApplyButton}
                        variant="secondary"
                      >
                       save
                      </Button>
            </div>

          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SettingsProfile;
