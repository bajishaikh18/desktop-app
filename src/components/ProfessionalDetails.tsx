import React from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import styles from "../app/page.module.scss";
import "../app/globals.scss";
import { useTranslations } from "next-intl";
import { updateUser } from "@/apis/auth";
import toast from "react-hot-toast";

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

  const [loading, setLoading] = React.useState(false);
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
      experienceYears: formData.experienceYears
        ? ""
        : "Experience years are required.",
      gulfExperience: formData.gulfExperience
        ? ""
        : "Gulf experience is required.",
      currentState: formData.currentState ? "" : "Current state is required.",
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (!hasErrors) {
      setLoading(true);
      try {
        const payload = {
          ...formData,
          gulfExperience: formData.gulfExperience === "Yes"? true : false
        }
        await updateUser(payload);
        toast.success("Professional details updated successfully!");
        setShowUploadModal(true);
        onSubmit(3);
      } catch (error) {
        toast.error("Failed to update professional details. Please try again.");
        console.error("Error updating user details:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Form className="register-form">
        <Form.Group className="form-group">
          <Form.Label>{t("current_job_title")}</Form.Label>
          <div className={styles.selectContainer}>
            <Form.Control
              as="select"
              name="currentJobTitle"
              value={formData.currentJobTitle}
              onChange={handleInputChange}
              isInvalid={!!errors.currentJobTitle}
              className={styles.selectInput}
            >
              <option value="">{t("select_your_job_title")}</option>
              <option value="Software Engineer">{t("software_engineer")}</option>
              <option value="Project Manager">{t("project_manager")}</option>
              <option value="Designer">{t("designer")}</option>
            </Form.Control>
            <img src="/Icon.png" alt="Job Icon" className={styles.iconImage} />
            <Form.Control.Feedback type="invalid">
              {errors.currentJobTitle}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="form-group">
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
              <option value="">{t("select_industry")}</option>
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

        <Form.Group className="form-group">
          <Form.Label>{t("total_number_of_years")}</Form.Label>
          <div className={styles.selectContainer}>
            <Form.Control
              as="select"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleInputChange}
              isInvalid={!!errors.experienceYears}
              className={styles.selectInput}
            >
              <option value="">{t("select_years_of_experience")}</option>
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

        <Form.Group className="form-group">
          <Form.Label>{t("do_you_have_gulf_experience?")}</Form.Label>
          <div className={styles.selectContainer}>
            <Form.Control
              as="select"
              name="gulfExperience"
              value={formData.gulfExperience}
              onChange={handleInputChange}
              isInvalid={!!errors.gulfExperience}
              className={styles.selectInput}
            >
              <option value="">{t("select_an_option")}</option>
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

        <Form.Group className="form-group">
          <Form.Label>{t("current_state")}</Form.Label>
          <div className={styles.selectContainer}>
            <Form.Control
              as="select"
              name="currentState"
              value={formData.currentState}
              onChange={handleInputChange}
              isInvalid={!!errors.currentState}
              className={styles.selectInput}
            >
              <option value="">{t("select_state")}</option>
              <option value="Maharashtra">{t("maharashtra")}</option>
              <option value="Delhi">{t("delhi")}</option>
              <option value="Uttar Pradesh">{t("uttar_pradesh")}</option>
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
        disabled={loading}
        style={{
          marginTop:"10px",
          marginBottom:"0px"
        }}
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
            {" "}
            Submitting...
          </>
        ) : (
          <>{t('submit')}</>
         
        )}
      </Button>
    </>
  );
};

export default ProfessionalDetails;
