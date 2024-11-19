import React, { useState } from 'react';
import styles from '../../components/Account/SettingsProfile.module.scss';
import { Form, Button, Card, Collapse } from 'react-bootstrap';
import Image from 'next/image';
import { useAuthUserStore } from '../../stores/useAuthUserStore';

interface UserProfile {
  name: string;
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

const SettingsProfile: React.FC<SettingsProfileProps> = ({ onSave = () => {}, onCancel = () => {} }) => {
  const { authUser } = useAuthUserStore();

  const [profile, setProfile] = useState<UserProfile>({
    name: authUser ? `${authUser.firstName} ${authUser.lastName}` : '',
    phone: authUser?.phone || '',
    email: authUser?.email || '',
    countryCode: '+91',
    dob: '',
    jobTitle: '',
    industry: '',
    experience: '',
    state: authUser?.country || '',
  });

  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleChange = (field: keyof UserProfile, value: string) => {
    console.log(`Field: ${field}, Value: ${value}`);
    setProfile((prev) => {
      const updatedProfile = { ...prev, [field]: value };
      console.log('Updated Profile:', updatedProfile); 
      return updatedProfile;
    });
  };

  const toggleSection = (section: string) => {
    console.log(`Toggling section: ${section}`); 
    setOpenSection(openSection === section ? null : section);
  };

  const handleSave = () => {
    console.log('Saving profile:', profile);
    if (onSave) {
      onSave(profile);
    }
  };

  return (
    <Card className={styles.settingsProfileCard}>
      <Card.Body>
        <div className={styles.settingsProfile}>
          <Form>
            
            <div className={styles.section}>
              <h3>
                Personal Details
                <Image
                  src="/setting.png"
                  alt="Settings"
                  width={16}
                  height={16}
                  style={{ right: '50px', position: 'absolute', display: 'inline-block' }}
                />
              </h3>
              <div className={styles.formRow}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your name"
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
  <Form.Label>Phone Number</Form.Label>
  <div className={styles.phoneNumberContainer}>
    <select
      className={styles.countryCodeDropdown}
      onChange={(e) => handleChange('countryCode', e.target.value)}
      defaultValue="+91"
    >
      <option value="+91">+91</option>
      <option value="+1">+01</option>
     
    </select>
    <span className={styles.separator}>|</span>
    <input
      type="text"
      value={profile.phone}
      onChange={(e) => handleChange('phone', e.target.value)}
      placeholder="Enter your phone number"
      className={styles.phoneInput}
    />
  </div>
</Form.Group>




              </div>
              <div className={styles.formRow}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.dob}
                    onChange={(e) => handleChange('dob', e.target.value)}
                    placeholder="Enter your birthday"
                  />
                </Form.Group>
              </div>
            </div>

            
            <div className={styles.section}>
              <h3>
                Professional Details
                <Image
                  src="/setting.png"
                  alt="Settings"
                  width={16}
                  height={16}
                  style={{ right: '50px', position: 'absolute', display: 'inline-block' }}
                />
              </h3>
              <div className={styles.formRow}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.jobTitle}
                    onChange={(e) => handleChange('jobTitle', e.target.value)}
                    placeholder="Enter your job title"
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Industry</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    placeholder="Enter your industry"
                  />
                </Form.Group>
              </div>
              <div className={styles.formRow}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Years of Experience</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    placeholder="Enter your experience"
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    value={profile.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    placeholder="Enter your state"
                  />
                </Form.Group>
              </div>
            </div>

           
            {['Account Settings', 'Notification Preference', 'Language'].map((section) => (
              <div key={section} className={`${styles.section} ${styles.collapsible}`}>
                <h3 onClick={() => toggleSection(section)}>
                  {section}
                  <Image
                    src="/icon.png"
                    alt={`${section} Icon`}
                    width={16}
                    height={16}
                    style={{ position: 'absolute', right: '50px', display: 'inline-block' }}
                  />
                </h3>
              </div>
            ))}

            
            <div className={styles.jobActions}>
              <Button className={styles.saveJobButton} variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
              <Button className={styles.easyApplyButton} variant="secondary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SettingsProfile;
