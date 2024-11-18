import React from 'react';
import styles from '../../components/Account/SettingsProfile.module.scss';
import { Form, Button, Card, Collapse } from 'react-bootstrap';
import Image from 'next/image';
interface UserProfile {
  name: string;
  phone: string;
  email: string;
  dob: string;
  jobTitle: string;
  industry: string;
  experience: string;
  state: string;
}

interface SettingsProfileProps {
  userProfile?: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
  onCancel: () => void;
}

const SettingsProfile: React.FC<SettingsProfileProps> = ({ 
  userProfile = {  
    name: '',
    phone: '',
    email: '',
    dob: '',
    jobTitle: '',
    industry: '',
    experience: '',
    state: ''
  },
  onSave, 
  onCancel 
}) => {
  const [profile, setProfile] = React.useState<UserProfile>(userProfile);
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(profile);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <Card className={styles.settingsProfileCard}>
      <Card.Body>
        <div className={styles.settingsProfile}>
          <Form>
            <div className={styles.section}>
              <h3>Personal Details   <Image 
    src="/setting.png" 
    alt="Settings" 
    width={16} 
    height={16} 
    style={{
      right:'50px', 
      position: 'absolute',   
      display: 'inline-block' 
    }} 
  /> </h3>
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
                  <div className={styles.phoneNumber}>
                    <Form.Select 
                      className={styles.countryCode}
                      defaultValue="+01"
                    >
                      <option>+01</option>
                      <option>+91</option>
                    </Form.Select>
                    <Form.Control 
                      type="text" 
                      value={profile.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="Enter your phone number" 
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
              <h3>Professional Details    <Image 
    src="/setting.png" 
    alt="Settings" 
    width={16} 
    height={16} 
    style={{
      right:'50px', 
      position: 'absolute',   
      display: 'inline-block' 
    }} 
  /> </h3>
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
                  <Form.Label>Total Number of Years of Experience</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={profile.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    placeholder="Enter your experience" 
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label>Current State</Form.Label>
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
                    }} 
                  />
                </h3>
              </div>
            ))}

<div className={styles.jobActions}>
           <Button
    className={styles.saveJobButton}
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
