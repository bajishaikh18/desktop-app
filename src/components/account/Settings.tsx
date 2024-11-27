import React, { useState, useEffect, useCallback } from "react";
import styles from "../../components/account/SettingsProfile.module.scss";
import {
  Form,
  Button,
  Card,
  InputGroup,
  Accordion,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useAuthUserStore } from "../../stores/useAuthUserStore";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { useTranslations } from "next-intl";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash";
import { getFormattedJobTitles } from "@/helpers/jobTitles";
import Select from "react-select";
import { IMAGE_BASE_URL, INDUSTRIES } from "@/helpers/constants";
import { StateSelect } from "react-country-state-city";
import { INDIAN_STATES } from "@/helpers/states";
import { updateUser } from "@/apis/auth";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { getSignedUrl, uploadFile } from "@/apis/common";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "../common/Feedbacks";

interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  countryCode: string;
  dob: string;
  profilePic:string;
  currentJobTitle: SelectOption;
  industry: SelectOption;
  totalExperience: SelectOption;
  gulfExperience: SelectOption;
  currentState: string;
}


type SelectOption = {
  value: string;
  label: string;
};

interface SettingsProfileProps {
  onSave?: (updatedProfile: UserProfile) => void;
  onCancel?: () => void;
}

const industries: any = Object.entries(INDUSTRIES).map(([key, val], i) => {
  return {
    value: key,
    label: val,
  };
});

const yearsOfExpericence: any = [
  {
    value: "0",
    label: "0-1 Years",
  },
  {
    value: "1",
    label: "1-2 Years",
  },
  {
    value: "2",
    label: "2-3 Years",
  },
];

const gulfExp: any = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const today = new Date();
const eighteenYearsAgo = new Date(new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
).setHours(0,0,0,0));


const SettingsProfile: React.FC<SettingsProfileProps> = () => {
  const t = useTranslations("Settings");
  const queryClient = useQueryClient();
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [jobTitleDefaultOptions, setJobTitleDefaultOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const { authUser, authUserLoading } = useAuthUserStore();
  const [selectedProfilePic, setSelectedProfilePic] = useState<File|null>(null);
  const [ imagePreview,setImagePreview] = useState("");
  const [loading,setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: authUser?.firstName || "",
    lastName: authUser?.lastName || "",
    phone: authUser?.phone || "",
    email: authUser?.email || "",
    countryCode: "+91",
    dob: authUser?.dob || "",
    currentJobTitle: {} as SelectOption,
    industry: {} as SelectOption,
    totalExperience: {} as SelectOption,
    gulfExperience: {} as SelectOption,
    profilePic:"",
    currentState: "",
  });

  const setDefaultOptionsForTitles = useCallback(
    async (jobTitle: { _id: string; title: string }, profile: any) => {
      const option = await getFormattedJobTitles(jobTitle.title);
      setJobTitleDefaultOptions(option);
      const prof = {
        ...profile,
        currentJobTitle: { label: jobTitle.title, value: jobTitle._id },
      };
      setProfile(prof);
      setImagePreview(`${IMAGE_BASE_URL}/${profile.profilePic}?t=${new Date().getTime()}`)
    },
    [profile]
  );

  const [openSections, setOpenSections] = useState<string[]>([
    "personalDetails",
    "professionalDetails",
    "Language",
  ]);
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    currentJobTitle: "",
    industry: "",
    totalExperience: "",
    gulfExperience: "",
    currentState: "",
  });


  const reset = useCallback(()=>{
    if(authUser){
      setDefaultOptionsForTitles(authUser.currentJobTitle, {
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        phone: authUser.phone,
        email: authUser.email,
        profilePic: authUser.profilePic,
        countryCode: "+91",
        dob: authUser.dob,
        currentJobTitle: authUser.currentJobTitle._id,
        industry: { label: INDUSTRIES[authUser.industry as "oil_gas"] || "", value: authUser.industry },
        totalExperience: {
          label: yearsOfExpericence.find(
            (x: any) => x.value === authUser.totalExperience.toString()
          )?.label,
          value: authUser.totalExperience.toString(),
        },
        gulfExperience: {
          label: gulfExp.find(
            (x: any) => x.value === (authUser.gulfExperience ? "yes" : "no")
          )?.label,
          value: authUser.gulfExperience ? "yes" : "no",
        },
        currentState: INDIAN_STATES.find(
          (x) => x.state_code.toLowerCase() === authUser.state.toLowerCase()
        ),
      });
    }
   
  },[authUser])
  useEffect(() => {
    if (authUser) {
      setDefaultOptionsForTitles(authUser.currentJobTitle, {
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        phone: authUser.phone,
        email: authUser.email,
        countryCode: "+91",
        profilePic: authUser.profilePic,
        dob: authUser.dob,
        currentJobTitle: authUser.currentJobTitle ? authUser.currentJobTitle._id : null,

        industry: { label: INDUSTRIES[authUser.industry as "oil_gas"] || "", value: authUser.industry },
        totalExperience: {
          label: yearsOfExpericence.find(
            (x: any) => x.value === (authUser.totalExperience?.toString() || "")
          )?.label || "",
          value: authUser.totalExperience?.toString() || "",
        },
        
        gulfExperience: {
          label: gulfExp.find(
            (x: any) => x.value === (authUser.gulfExperience ? "yes" : "no")
          )?.label,
          value: authUser.gulfExperience ? "yes" : "no",
        },
        currentState: INDIAN_STATES.find(
          (x) => x.state_code.toLowerCase() === (authUser.state?.toLowerCase() || "")
        ),
        
      });

      if (authUser.dob) {
        setSelectedDate(new Date(authUser.dob));
      }
    }
  }, [authUser]);


  const handleSubmit = async () => {
    if(!validateForm()){
      return
    }
      setLoading(true);
      try {
        let signedUrlResp = null
        if(selectedProfilePic){
          signedUrlResp = await getSignedUrl("profilePic", selectedProfilePic.type);
          if(signedUrlResp){
            await uploadFile(signedUrlResp.uploadurl, selectedProfilePic!);
          }
          
        }
        const payload = {
          ...profile,
          profilePic:signedUrlResp?.keyName || profile.profilePic,
          state:typeof profile.currentState==="string" ? profile.currentState : (profile.currentState as any).state_code ,
          currentJobTitle: (profile.currentJobTitle as SelectOption).value,
          totalExperience: (profile.totalExperience as SelectOption).value,
          industry: (profile.industry as SelectOption).value,
          gulfExperience:
            (profile.gulfExperience as SelectOption).value === "Yes"
              ? true
              : false,
        };
        await updateUser(payload);
        queryClient.invalidateQueries({
          predicate: (query) => {
            return query.queryKey.includes('userDetail');
          },
          refetchType:'all'
        })
        setSelectedProfilePic(null);
        toast.success(t("success"));
      } catch (error) {
        toast.error(t("submit_error"));
        console.error("Error updating user details:", error);
      } finally {
        setLoading(false);
      }
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const loadOptionsDebounced = useCallback(
    debounce((inputValue: string, callback: (options: any) => void) => {
      getFormattedJobTitles(inputValue).then((options) => callback(options));
    }, 500),
    []
  );


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, email: e.target.value });
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    if (date) {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      setProfile((prevData) => ({ ...prevData, dob: formattedDate }));
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

  const onStateChange = (value:any) => {
    setProfile((prevData) => ({ ...prevData, currentState: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, currentState: "" }));
  };

  const onProfileDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
    setSelectedProfilePic(file);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections: videoRejections,
  } = useDropzone({
    onDrop: onProfileDrop,
    maxSize: 10 * 1024 * 1024, //10 MB
    accept: {
      "image/*": [],
    },
  });
  
  const validateForm = () => {
    const errors = {
      firstName: profile.firstName ? "" : "First name is required",
      lastName: profile.lastName ? "" : "Last name is required",
      email:
        profile.email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(profile.email)
          ? ""
          : "Enter a valid email",
      dob: profile.dob ? "" : "Date of Birth is required",
      currentJobTitle: profile.currentJobTitle ? "" : "Job title is required",
      industry: profile.industry ? "" : "Industry is required",
      totalExperience: profile.totalExperience
        ? ""
        : "ExperienceYears is required",
      gulfExperience: profile.gulfExperience
        ? ""
        : "gulfExperience is required",
      currentState: profile.currentState ? "" : "State is required",
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };
  if(authUserLoading){
    return       <main className="main-section">
<Loader text="Fetching user data"/>
</main>
  }
  return (
    <Container>
      <Card className={styles.settingsProfileCard}>
        <Card.Header className={styles.cardHeader}>
          <h3>My Account</h3>
        </Card.Header>
        
        <Card.Body className={styles.cardBody}>
          <Row>
            <Col lg={8}>
              <div className={styles.settingsProfile}>
                <div className={styles.profilePictureContainer}>
                  <p className={styles.sectionText}>{t("profile_picture")}</p>
                </div>
                <div className={styles.profileImageContainer}>
                  
                  <img
                    src={`${imagePreview ? imagePreview:'/no_image.jpg'}`}
                    alt="Profile Picture"
                    width={79}
                    height={79}
                    className={styles.profilePicture}
                  />

                  <button className={styles.changeButton} {...getRootProps()}>
                  <input {...getInputProps()} />
                    {t("change")}
                  </button>
                  {
                    selectedProfilePic && <p className={styles.note}>* Save the changes to persist new image</p>

                  }

                </div>
                <Form>
                  <div className={styles.section}>
                    <h3
                      className={styles.sectionText}
                      onClick={() => toggleSection("personalDetails")}
                    >
                      {t("personal_details")}
                      <Image
                        src="/setting.png"
                        alt="Settings"
                        width={20}
                        height={20}
                        style={{
                          right: "0px",
                          position: "absolute",
                          display: "inline-block",
                          cursor: "pointer",
                          transform: openSections.includes("personalDetails")
                            ? "rotate(0deg)"
                            : "rotate(180deg)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </h3>
                    {openSections.includes("personalDetails") && (
                      <div>
                        <Row className={styles.formRow}>
                          <Col lg={6}>
                            <Form.Group
                              className={styles.formGroup}
                              style={{ flex: 1 }}
                            >
                              <Form.Label> {t("firstname")}</Form.Label>
                              <Form.Control
                                type="text"
                                value={profile.firstName}
                                placeholder={t("enter_firstname")}
                                onChange={(e) =>
                                  handleChange("firstName", e.target.value)
                                }
                                className="inputField"
                                isInvalid={!!formErrors.firstName}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.firstName}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group
                              className={styles.formGroup}
                              style={{ flex: 1 }}
                            >
                              <Form.Label>{t("lastname")}</Form.Label>
                              <Form.Control
                                type="text"
                                value={profile.lastName}
                                placeholder={t("enter_lastname")}
                                onChange={(e) =>
                                  handleChange("lastName", e.target.value)
                                }
                                className="inputField"
                                isInvalid={!!formErrors.lastName}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.lastName}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className={styles.formRow}>
                          <Col lg={6}>
                            <Form.Group
                              className={styles.formGroup}
                              style={{ flex: 1 }}
                            >
                              <Form.Label>{t("Phone")}</Form.Label>
                              <h3 className={styles.phone}>{profile.phone}</h3>
                              {/* <InputGroup>
                                <InputGroup.Text
                                  id="basic-addon1"
                                  style={{ whiteSpace: "nowrap" }}
                                >
                                  +91
                                </InputGroup.Text>
                                <Form.Control
                                  type="text"
                                  placeholder={t("enter_mobileNo")}
                                  name="phone"
                                  disabled={true}
                                  value={profile.phone}
                                  className={styles.contactInput}
                                  onChange={handlePhoneChange}
                                  isInvalid={!!formErrors.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                </Form.Control.Feedback>
                              </InputGroup> */}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group
                              className={styles.formGroup}
                              style={{ flex: 1 }}
                            >
                              <Form.Label>{t("email")}</Form.Label>
                              <Form.Control
                                type="email"
                                value={profile.email}
                                placeholder={t("enter_email")}
                                onChange={handleEmailChange}
                                className="inputField"
                                isInvalid={!!formErrors.email}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className={styles.formRow}>
                          <Col lg={6}>
                            <Form.Group className={styles.formGroup}>
                              <Form.Label>{t("dateofbirth")}</Form.Label>
                              <div style={{ position: "relative" }}>
                                <DatePicker
                                  selected={selectedDate}
                                  dateFormat="dd-MM-yyyy"
                                  placeholderText="DD-MM-YYYY"
                                  popperClassName="custom-date-picker"
                                  onChange={handleDateChange} 
                                  maxDate={eighteenYearsAgo}
                                  customInput={
                                    <Form.Control
                                      type="text"
                                      placeholder="YYYY-MM-DD"
                                      readOnly
                                      isInvalid={!!formErrors.dob}
                                      className={styles.dobInput}
                                    />
                                  }
                                  className={styles.datePicker}
                                  popperPlacement="bottom"
                                  onClickOutside={() =>
                                    setDatePickerVisible(false)
                                  }
                                />
                                <Image
                                  src="/mingcute_calendar-line.png"
                                  alt="Calendar"
                                  width={18}
                                  height={20}
                                  className={styles.calendarIcon}
                                  onClick={() =>
                                    setDatePickerVisible(!datePickerVisible)
                                  }
                                  style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                  }}
                                />
                                {formErrors.dob && (
                                  <Form.Text className="error">
                                    {formErrors.dob}
                                  </Form.Text>
                                )}
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </div>

                  <div className={styles.section}>
                    <h3
                      className={styles.sectionText}
                      onClick={() => toggleSection("professionalDetails")}
                    >
                      {t("professional_details")}
                      <Image
                        src="/setting.png"
                        alt="Settings"
                        width={20}
                        height={20}
                        style={{
                          right: "0px",
                          position: "absolute",
                          display: "inline-block",
                          cursor: "pointer",
                          transform: openSections.includes(
                            "professionalDetails"
                          )
                            ? "rotate(0deg)"
                            : "rotate(180deg)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </h3>
                    {openSections.includes("professionalDetails") && (
                      <div>
                        <Row className={`${styles.formRow}`}>
                          <Col lg={6}>
                            <Form.Group className={`form-group ${styles.formGroup}`}>
                              <Form.Label>{t("current_job_title")}</Form.Label>
                              <div className={styles.selectContainer}>
                                <AsyncSelect
                                  cacheOptions
                                  loadOptions={loadOptionsDebounced}
                                  placeholder={t("select_job_title")}
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      fontSize: "16px",
                                      borderRadius: "8px",
                                      boxShadow: "none",
                                      borderWidth: "1px",
                                      borderStyle: "solid",
                                      borderColor: formErrors.currentJobTitle
                                        ? "rgb(228, 77, 77)"
                                        : "rgba(189, 189, 189, 1)",
                                      minHeight: "44px",
                                      svg: {
                                        path: {
                                          fill: "#000",
                                        },
                                      },
                                    }),
                                    indicatorSeparator: () => ({
                                      display: "none",
                                    }),
                                  }}
                                  defaultOptions={jobTitleDefaultOptions}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "rgba(246, 241, 255, 1)",
                                      primary: "#0045E6",
                                    },
                                  })}
                                  name="currentJobTitle"
                                  value={profile.currentJobTitle}
                                  onChange={(e: any) => {
                                    handleChange("currentJobTitle", e);
                                  }}
                                />

                                {formErrors.currentJobTitle && (
                                  <Form.Text className="error">
                                    {formErrors.currentJobTitle}
                                  </Form.Text>
                                )}
                              </div>
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group
                              className={styles.formGroup}
                              style={{ flex: 1 }}
                            >
                              <Form.Label>{t("industry")}</Form.Label>
                              <div className={styles.selectContainer}>
                                <Select
                                  placeholder={t("select_industry")}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "rgba(246, 241, 255, 1)",
                                      primary: "#0045E6",
                                    },
                                  })}
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      fontSize: "16px",
                                      borderRadius: "8px",
                                      boxShadow: "none",
                                      borderWidth: "1px",
                                      borderStyle: "solid",
                                      borderColor: formErrors.industry
                                        ? "rgb(228, 77, 77)"
                                        : "rgba(189, 189, 189, 1)",
                                      minHeight: "44px",
                                      svg: {
                                        path: {
                                          fill: "#000",
                                        },
                                      },
                                    }),
                                    indicatorSeparator: () => ({
                                      display: "none",
                                    }),
                                  }}
                                  name="industry"
                                  options={industries}
                                  value={profile.industry}
                                  onChange={(e: any) => {
                                    handleChange("industry", e);
                                  }}
                                />
                                {formErrors.industry && (
                                  <Form.Text className="error">
                                    {formErrors.industry}
                                  </Form.Text>
                                )}
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className={`${styles.formRow}`}>
                          <Col lg={6}>
                            <Form.Group className={`form-group ${styles.formGroup}`}>
                              <Form.Label>{t("experience_years")}</Form.Label>

                              <div className={styles.selectContainer}>
                                <Select
                                  placeholder={t("select_experience")}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "rgba(246, 241, 255, 1)",
                                      primary: "#0045E6",
                                    },
                                  })}
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      fontSize: "16px",
                                      borderRadius: "8px",
                                      boxShadow: "none",
                                      borderWidth: "1px",
                                      borderStyle: "solid",
                                      borderColor: formErrors.industry
                                        ? "rgb(228, 77, 77)"
                                        : "rgba(189, 189, 189, 1)",
                                      minHeight: "44px",
                                      svg: {
                                        path: {
                                          fill: "#000",
                                        },
                                      },
                                    }),
                                    indicatorSeparator: () => ({
                                      display: "none",
                                    }),
                                  }}
                                  name="totalExperience"
                                  options={yearsOfExpericence}
                                  value={profile.totalExperience}
                                  onChange={(e: any) => {
                                    handleChange("totalExperience", e);
                                  }}
                                />
                                {formErrors.totalExperience && (
                                  <Form.Text className="error">
                                    {formErrors.totalExperience}
                                  </Form.Text>
                                )}
                              </div>
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className={styles.formGroup}>
                              <Form.Label>{t("current_state")}</Form.Label>
                              <StateSelect
                                countryid={101}
                                onChange={(e: any) => {
                                  onStateChange(e);
                                }}
                                defaultValue={profile.currentState}
                                placeHolder="Select State"
                              />
                              {formErrors.currentState && (
                                <Form.Text className="error">
                                  {formErrors.currentState}
                                </Form.Text>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className={styles.formRow}>
                          <Col lg={6}>
                            <Form.Group className={styles.formGroup}>
                              <Form.Label>{t("gulf_experience?")}</Form.Label>
                              <div className={styles.selectContainer}>
                                <Select
                                  placeholder={t("select_gulf")}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "rgba(246, 241, 255, 1)",
                                      primary: "#0045E6",
                                    },
                                  })}
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      fontSize: "16px",
                                      borderRadius: "8px",
                                      boxShadow: "none",
                                      borderWidth: "1px",
                                      borderStyle: "solid",
                                      borderColor: formErrors.industry
                                        ? "rgb(228, 77, 77)"
                                        : "rgba(189, 189, 189, 1)",
                                      minHeight: "44px",
                                      svg: {
                                        path: {
                                          fill: "#000",
                                        },
                                      },
                                    }),
                                    indicatorSeparator: () => ({
                                      display: "none",
                                    }),
                                  }}
                                  name="gulfExperience"
                                  options={gulfExp}
                                  value={profile.gulfExperience}
                                  onChange={(e: any) => {
                                    handleChange("gulfExperience", e);
                                  }}
                                />
                                {formErrors.gulfExperience && (
                                  <Form.Text className="error">
                                    {formErrors.gulfExperience}
                                  </Form.Text>
                                )}
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </div>

                  <div className={styles.jobActions}>
                    <Button
                    onClick={reset}
                      className={`${styles.saveJobButton} ${styles.cancelButton}`}
                    >
                      {" "}
                      {t("cancel")}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      className={styles.saveJobButton}
                      disabled={loading}
                   
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          {t("submitting")}
                        </>
                      ) : (
                        <>{t("save")}</>
                      )}
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SettingsProfile;
