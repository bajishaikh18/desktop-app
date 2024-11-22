import React, { useState, useEffect } from 'react';
import styles from '../../components/account/SettingsProfile.module.scss';
import { Form, Button, Card, InputGroup, Accordion } from 'react-bootstrap';
import { useAuthUserStore } from '../../stores/useAuthUserStore';
import Image from 'next/image';
import DatePicker from "react-datepicker";
import { useTranslations } from "next-intl";


interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  countryCode: string;
  dob: string;
  currentJobTitle:string;
  industry:string;
  experienceYears:string ;
  gulfExperience:string;
  currentState: string;
}

interface SettingsProfileProps {
  onSave?: (updatedProfile: UserProfile) => void;
  onCancel?: () => void;
}

const SettingsProfile: React.FC<SettingsProfileProps> = () => {
  const t = useTranslations("Settings");
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { authUser } = useAuthUserStore(); 

  const [profile, setProfile] = useState<UserProfile>({
    firstName: authUser?.firstName || '',
    lastName: authUser?.lastName || '',
    phone: authUser?.phone || '',
    email: authUser?.email || '',
    countryCode: '+91',
    dob: authUser?.dob || '',
    currentJobTitle:'',
    industry:'',
    experienceYears:'',
    gulfExperience:'',
    currentState:'',
   
  });

  const [openSections, setOpenSections] = useState<string[]>([
    'personalDetails',
    'professionalDetails',
    'Language',
  ]);
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    currentJobTitle:'',
    industry:'',
    experienceYears:'',
    gulfExperience:'',
    currentState:'',
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
        currentJobTitle:'',
        industry:'',
        experienceYears:'',
        gulfExperience:'',
        currentState:'',
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

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
     

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        dob: "",
      }));
    }
    setDatePickerVisible(false);
  };

  const toggleSection = (section: string) => {
    setOpenSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((s) => s !== section)
        : [...prevSections, section]
    );
  };
  
  const validateForm = () => {
    const errors = {
      firstName: profile.firstName ? '' : 'First name is required',
      lastName: profile.lastName ? '' : 'Last name is required',
      phone: profile.phone ? '' : 'Phone is required',
      email: profile.email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(profile.email) ? '' : 'Enter a valid email',
      dob: profile.dob ? '' : 'Date of Birth is required',
      currentJobTitle: profile.currentJobTitle ? '' : 'Job title is required',
      industry: profile.industry ? '' : 'Industry is required',
      experienceYears: profile.experienceYears ? '' : 'ExperienceYears is required',
      gulfExperience: profile.gulfExperience ? '' : 'gulfExperience is required',
      currentState: profile.currentState ? '' : 'State is required',
     
    };

    return !Object.values(errors).some((error) => error);
  };

  return (
    <Card className={styles.settingsProfileCard}>
      <Card.Body>
        <div className={styles.settingsProfile}>
        <div className={styles.profilePictureContainer}>
        <p className={styles.profileText}>{t('profile_picture')}</p>
        </div>
        <div className={styles.profileImageContainer}>
        <img src="/profile picture.png" alt="Profile Picture" width={79} height={79}
         className={styles.profilePicture}
         />

         <button className={styles.changeButton}>{t('change')}</button>
          </div>
          <Form>
            <div className={styles.section}>
              <h3 onClick={() => toggleSection('personalDetails')}>
                {t('personal_details')}
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
                    transform: openSections.includes('personalDetails')
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
               
              </h3>
              {openSections.includes('personalDetails') && (
                <div>
                  <div className={`${styles.formRow} d-flex`}>
                    <Form.Group className={styles.formGroup}  style={{ flex: 1, marginRight: '10px' }}>
                      <Form.Label> {t("firstname")}</Form.Label>
                      <Form.Control
                        type="text"
                        value={profile.firstName}
                        placeholder={t('enter_firstname')}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        className="inputField"
                        isInvalid={!!formErrors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={styles.formGroup}  style={{ flex: 1 }}>
                    <Form.Label>{t("lastname")}</Form.Label>
                      <Form.Control
                        type="text"
                        value={profile.lastName}
                        placeholder={t('enter_lastname')}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        className="inputField"
                        isInvalid={!!formErrors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">{formErrors.lastName}</Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className={`${styles.formRow} d-flex`}>
           <Form.Group className={styles.formGroup} style={{ flex: 1, marginRight: '10px' }}>
           <Form.Label>{t('Phone')}</Form.Label>
            <InputGroup>
             <InputGroup.Text id="basic-addon1" style={{ whiteSpace: 'nowrap' }}>+91</InputGroup.Text>
            <Form.Control
            type="text"
            placeholder={t('enter_mobileNo')}
            name="phone"
            value={profile.phone}
            className={styles.contactInput}
            onChange={handlePhoneChange}
           isInvalid={!!formErrors.phone}
           />
          <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
          </InputGroup>
            </Form.Group>
           <Form.Group  className={styles.formGroup}  style={{ flex: 1 }}>
                      <Form.Label>{t('email')}</Form.Label>
                      <Form.Control
                        type="email"
                        value={profile.email}
                        placeholder={t('enter_email')}
                        onChange={handleEmailChange}
                        className="inputField"
                        isInvalid={!!formErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className={styles.formRow}>
                  <Form.Group className={styles.formGroup} style={{ flex: 1, maxWidth: '340px' }}>
                    <Form.Label>{t("dateofbirth")}</Form.Label>
               <div style={{ position: 'relative' }}>
                 <DatePicker
                 selected={selectedDate}
                 onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="DD-MM-YYYY"
                  popperClassName="custom-date-picker"
                  customInput={
                <Form.Control
                 type="text"
                  placeholder="YYYY-MM-DD"
                 value={profile.dob}
                 readOnly
                isInvalid={!!formErrors.dob}
               className={styles.dobInput} 
               />
      }
              className={styles.datePicker}
              popperPlacement="bottom"
              onClickOutside={() => setDatePickerVisible(false)}
            />
             <Image src="/mingcute_calendar-line.png" alt="Calendar" width={18} height={20} className={styles.calendarIcon}
              onClick={() => setDatePickerVisible(!datePickerVisible)}
          style={{   position: 'absolute',  right: '10px', top: '50%',  transform: 'translateY(-50%)',  cursor: 'pointer',
        }}
       />
          {formErrors.dob && (
          <Form.Text className="error">{formErrors.dob}</Form.Text>
       )}
               </div>
           </Form.Group>
               </div>
                </div>
              )}
            </div>

            <div className={styles.section}>
              <h3 onClick={() => toggleSection('professionalDetails')}>
                {t('professional_details')}
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
                    transform: openSections.includes('professionalDetails')
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  }}
                />
              </h3>
              {openSections.includes('professionalDetails') && (

                <div>
                  <div className={`${styles.formRow} d-flex`}>
                  <Form.Group className={styles.formGroup}   style={{ flex: 1, marginRight: '10px' }}>
                  <Form.Label>{t("current_job_title")}</Form.Label>
                      <Form.Select
                      value={profile.currentJobTitle}
                      onChange={(e) => handleChange('currentJobTitle', e.target.value)}
                      className="inputField"
                     isInvalid={!!formErrors.currentJobTitle}
                       >
                   <option value="" disabled hidden>
                    {t("select_job_title")}
                    </option>
                   </Form.Select>
                  {formErrors.currentJobTitle && <div className="text-danger">{formErrors.currentJobTitle}</div>}
                    </Form.Group>

                    <Form.Group  className={styles.formGroup}  style={{ flex: 1 }}>
                    <Form.Label>{t("industry")}</Form.Label>
                    <Form.Select
                     value={profile.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    className="inputField"
                   isInvalid={!!formErrors.industry}
                     >
                   <option value="" disabled hidden>
                  {t("select_industry")}
                    </option>
                 <option value="IT">{t('iT')}</option>
                   <option value="Construction">{t('construction')}</option>
                   <option value="Health Care">{t('healthcare')}</option>
                  </Form.Select>
                 {formErrors.industry && ( <div className="invalid-feedback">{formErrors.industry}</div>
                 )}
                </Form.Group>
                  </div>

                  <div className={`${styles.formRow} d-flex`}>
                <Form.Group className="form-group" style={{ flex: 1, marginRight: '10px' }}>
                  <Form.Label>{t('experience_years')}</Form.Label>
                 <Form.Select
                  value={profile.experienceYears}
                  onChange={(e) => handleChange('experienceYears', e.target.value)}
                  className="inputField"
                   isInvalid={!!formErrors.experienceYears}
                   >
                  <option value="" disabled hidden>
                  {t("select_experience")}
                 </option>
                 <option value="0-1">0-1 Years</option>
                  <option value="1-3">1-3 Years</option>
                  </Form.Select>
                 {formErrors.experienceYears && (<div className="invalid-feedback">{formErrors.experienceYears}</div>
                   )}
                     </Form.Group>
                 <Form.Group  className={styles.formGroup}  style={{ flex: 1 }}>
                      <Form.Label>{t("current_state")}</Form.Label>
                      <Form.Select
                      value={profile.currentState}
                       onChange={(e) => handleChange('currentState', e.target.value)}
                      className="inputField"
                     isInvalid={!!formErrors.currentState}
                       >
                        <option value="" disabled hidden>
                     {t('select_state')}
                    </option>
                      </Form.Select>
                   {formErrors.currentState && <div className="text-danger">{formErrors.currentState}</div>}
                    </Form.Group>
                    </div>
                    <div className={styles.formRow}>
                  <Form.Group className={styles.formGroup} style={{ flex: 1, maxWidth: '340px' }}>
                  <Form.Label>{t("gulf_experience?")}</Form.Label>
                    <Form.Select
                    value={profile.gulfExperience}
                    onChange={(e) => handleChange('gulfExperience', e.target.value)}
                     className="inputField"
                       isInvalid={!!formErrors.gulfExperience}
                      >
                   <option value="" disabled hidden>
                      {t('select_gulf')}
                   </option>
                   <option value="Yes">{t('yes')}</option>
                   <option value="No">{t('no')}</option>
                    </Form.Select>
                   {formErrors.gulfExperience &&(<div className="invalid-feedback">{formErrors.gulfExperience}</div>
                   )}
                </Form.Group>
                 </div>
                </div>
              )}
            </div>

           
            {['Language'].map((section) => (
              <div key={section} className={`${styles.section} ${styles.collapsible}`} onClick={() => toggleSection(section)}>
                <h3>
                {t('language')}
                  <Image src="/Icon.png"alt="Section Icon"width={16} height={16}
                    style={{
                      position: 'absolute',
                      right: '50px',
                      display: 'inline-block',
                      transform: openSections.includes(section)
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </h3>
                </div>
            ))}
               <div className={styles.jobActions}>
                <Button  className={styles.saveJobButton}
                          variant="secondary"
                      > {t('cancel')}
                        </Button>
                         <Button
                        className={styles.easyApplyButton}
                        variant="secondary"
                      >
                       {t('save')}
                      </Button>
                      </div>
           </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SettingsProfile;
