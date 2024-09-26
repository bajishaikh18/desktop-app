import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "../app/page.module.scss";
import "../app/globals.scss";
import { useTranslations } from "next-intl";
import { updateUser } from "@/apis/Auth";

interface ProfessionalDetailsProps {
  onSubmit: (screen: number) => void;
}

const ProfessionalDetails: React.FC<ProfessionalDetailsProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState({
    currentJobTitle: "",
    industry: "",
    experienceYears: "",
    gulfExperience: "",
    currentState: "",
  });
  
  const t = useTranslations("Professional");

  const [errors, setErrors] = React.useState({
    currentJobTitle: "",
    industry: "",
    experienceYears: "",
    gulfExperience: "",
    currentState: "",
  });

  const [showUploadModal, setShowUploadModal] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      currentJobTitle: formData.currentJobTitle ? "" : "Job title is required.",
      industry: formData.industry ? "" : "Industry is required.",
      experienceYears: formData.experienceYears ? "" : "Experience years are required.",
      gulfExperience: formData.gulfExperience ? "" : "Gulf experience is required.",
      currentState: formData.currentState ? "" : "Current state is required.",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
     if (!hasErrors) {
    
      try {
      await updateUser(formData);
        setShowUploadModal(true);
        onSubmit(3); 
      } catch (error) {
        console.error("Error updating user details:", error);
       
      }
    }
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>{t("current job title")}</Form.Label>
          <div className={styles.selectContainer}>
            <Form.Control
              as="select"
              name="currentJobTitle"
              value={formData.currentJobTitle}
              onChange={handleInputChange}
              isInvalid={!!errors.currentJobTitle}
              className={styles.selectInput}
            >
              <option value="">{t("select your job title")}</option>
              <option value="Software Engineer">{t("software engineer")}</option>
              <option value="Project Manager">{t("project manager")}</option>
              <option value="Designer">{t("designer")}</option>
            </Form.Control>
            <img src="/Icon.png" alt="Job Icon" className={styles.iconImage} />
            <Form.Control.Feedback type="invalid">
              {errors.currentJobTitle}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>{t("industry")}</Form.Label>
          <div className={styles.selectContainer}>
            <Form.Control
              as="select"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              isInvalid={!!errors.industry}
              className={styles.selectInput}
            >
              <option value="">{t("select industry")}</option>
              <option value="IT">{t("iT")}</option>
              <option value="Construction">{t("construction")}</option>
              <option value="Healthcare">{t("healthcare")}</option>
            </Form.Control>
            <img
              src="/Icon.png"
              alt="Industry Icon"
              className={styles.iconImage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.industry}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>{t("total number of years")}</Form.Label>
          <div className={styles.selectContainer}>
            <Form.Control
              as="select"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleInputChange}
              isInvalid={!!errors.experienceYears}
              className={styles.selectInput}
            >
              <option value="">{t("select years of experience")}</option>
              <option value="0-2">0-2</option>
              <option value="3-5">3-5</option>
              <option value="6-10">6-10</option>
            </Form.Control>
            <img
              src="/Icon.png"
              alt="Experience Icon"
              className={styles.iconImage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.experienceYears}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>{t("do you have gulf experience?")}</Form.Label>
          <div className={styles.selectContainer}>
            <Form.Control
              as="select"
              name="gulfExperience"
              value={formData.gulfExperience}
              onChange={handleInputChange}
              isInvalid={!!errors.gulfExperience}
              className={styles.selectInput}
            >
              <option value="">{t("select an option")}</option>
              <option value="No">{t("no")}</option>
              <option value="Yes">{t("yes")}</option>
            </Form.Control>
            <img
              src="/Icon.png"
              alt="Gulf Experience Icon"
              className={styles.iconImage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.gulfExperience}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>{t("current state")}</Form.Label>
          <div className={styles.selectContainer}>
            <Form.Control
              as="select"
              name="currentState"
              value={formData.currentState}
              onChange={handleInputChange}
              isInvalid={!!errors.currentState}
              className={styles.selectInput}
            >
              <option value="">{t("select state")}</option>
              <option value="Maharashtra">{t("maharashtra")}</option>
              <option value="Delhi">{t("delhi")}</option>
              <option value="Uttar Pradesh">{t("uttar pradesh")}</option>
            </Form.Control>
            <img
              src="/Icon.png"
              alt="State Icon"
              className={styles.iconImage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.currentState}
            </Form.Control.Feedback>
          </div>
        </Form.Group>
      </Form>
      <Button
        variant="primary"
        onClick={handleSubmit}
        style={{
          fontSize: "8px",
          padding: "1px 2px",
          lineHeight: "1",
          marginBottom: "-50px",
          marginTop: "-20px",
        }}
      >
        {t("submit")}
      </Button>
    </>
  );
};

export default ProfessionalDetails;
