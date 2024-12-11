import React, { useCallback } from "react";
import {  Button, Form, Spinner } from "react-bootstrap";
import styles from "../../app/page.module.scss";
import { useTranslations } from "next-intl";
import { updateUser } from "@/apis/auth";
import toast from "react-hot-toast";
import Select ,{ ActionMeta, SingleValue } from "react-select";
import AsyncSelect from 'react-select/async';
import { StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { getFormattedJobTitles } from "@/helpers/jobTitles";
import { debounce } from "lodash";
import { INDUSTRIES } from "@/helpers/constants";

interface ProfessionalDetailsProps {
  onSubmit: (screen: number) => void;
}

type SelectOption = {
  value: string;
  label: string;
};

type FormData = {
  currentJobTitle: string | SelectOption;
  industry: string | SelectOption;
  experienceYears: string | SelectOption;
  gulfExperience: string | SelectOption;
  currentState: string;
};

const ProfessionalDetails: React.FC<ProfessionalDetailsProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState<FormData>({
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

  const industries: any = Object.entries(INDUSTRIES).map(([key,val],)=>{
    return {
      value:key,
      label: val
    }
  })
  
  const yearsOfExperience: { value: string; label: string }[] = [];
  const rangeStep = 1; 
  const maxYears = 10; 
  
  
  for (let i = 0; i <= maxYears; i++) {
    const start = i;
    const end = start + rangeStep;
    
  
    if (i < maxYears) {
      yearsOfExperience.push({
        value: `${start}`,
        label: `${start}-${end} Years`,
      });
    } else {
      yearsOfExperience.push({
        value: `${start}`,
        label: `${start}+ Years`,
      });
    }
  }
  
 
  



 
  
  
  
  

  const gulfExp: any = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const [loading, setLoading] = React.useState(false);
  const [, setShowUploadModal] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const loadOptionsDebounced = useCallback(
    debounce((inputValue: string, callback: (options: any) => void) => {
        getFormattedJobTitles(inputValue).then(options => callback(options))
    }, 500),
    []
);

  const onChange = (
    newValue: SingleValue<any>,
    actionMeta: ActionMeta<any>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [actionMeta.name as string]: newValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [actionMeta.name as string]: "",
    }));
  };

  const onStateChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, currentState: value }));
    setErrors((prevErrors) => ({ ...prevErrors, currentState: "" }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      currentJobTitle: (formData.currentJobTitle as SelectOption)?.value
        ? ""
        : t('job_title_error'),
      industry: (formData.industry as SelectOption).value
        ? ""
        :  t('industry_error'),
      experienceYears: (formData.industry as SelectOption).value
        ? ""
        :  t('exp_error'),
      gulfExperience: (formData.gulfExperience as SelectOption).value
        ? ""
        :  t('gulf_exp_error'),
      currentState: formData.currentState ? "" :  t('state_error'),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (!hasErrors) {
      setLoading(true);
      try {
        const payload = {
          ...formData,
          state:formData.currentState,
          currentJobTitle: (formData.currentJobTitle as SelectOption).value,
          totalExperience: (formData.experienceYears as SelectOption).value,
          industry: (formData.industry as SelectOption).value,
          gulfExperience:
            (formData.gulfExperience as SelectOption).value === "Yes"
              ? true
              : false,
        };
        console.log(payload);
        await updateUser(payload);
        toast.success(t("success"));
        setShowUploadModal(true);
        onSubmit(3);
      } catch (error) {
        toast.error(t("submit_error"));
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
          <AsyncSelect
            cacheOptions
            loadOptions={loadOptionsDebounced}
            placeholder={t("select_your_job_title")}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                fontSize: "16px",
                borderRadius: "8px",
                boxShadow: "none",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: errors.currentJobTitle
                  ? "rgb(228, 77, 77)"
                  : "rgba(189, 189, 189, 1)",
                minHeight: "44px",
                svg: {
                  path: {
                    fill: "#000",
                  },
                },
              }),
              indicatorSeparator: () => ({ display: "none" }),
            }}
            defaultOptions
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: 'rgba(246, 241, 255, 1)',
                primary: '#0045E6',
              },
            })}
            name="currentJobTitle"
            value={formData.currentJobTitle}
            onChange={onChange}
            />
            {errors.currentJobTitle && (
              <Form.Text className="error">{errors.currentJobTitle}</Form.Text>
            )}
          </div>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>{t("industry")}</Form.Label>
          <div className={styles.selectContainer}>
            <Select
              placeholder={t("select_industry")}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: 'rgba(246, 241, 255, 1)',
                  primary: '#0045E6',
                },
              })}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: "16px",
                  borderRadius: "8px",
                  boxShadow: "none",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: errors.industry
                    ? "rgb(228, 77, 77)"
                    : "rgba(189, 189, 189, 1)",
                  minHeight: "44px",
                  svg: {
                    path: {
                      fill: "#000",
                    },
                  },
                }),
                indicatorSeparator: () => ({ display: "none" }),
              }}
              name="industry"
              options={industries}
              value={formData.industry}
              onChange={onChange}
            />
            {errors.industry && (
              <Form.Text className="error">{errors.industry}</Form.Text>
            )}
          </div>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>{t("total_number_of_years")}</Form.Label>
          <div className={styles.selectContainer}>
            <Select
              placeholder={t("select_years_of_experience")}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: 'rgba(246, 241, 255, 1)',
                  primary: '#0045E6',
                },
              })}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: "16px",
                  borderRadius: "8px",
                  boxShadow: "none",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: errors.experienceYears
                    ? "rgb(228, 77, 77)"
                    : "rgba(189, 189, 189, 1)",
                  minHeight: "44px",
                  svg: {
                    path: {
                      fill: "#000",
                    },
                  },
                }),
                indicatorSeparator: () => ({ display: "none" }),
              }}
              name="experienceYears"
              options={yearsOfExperience}
              value={formData.experienceYears}
              onChange={onChange}
            />

            {errors.experienceYears && (
              <Form.Text className="error">{errors.experienceYears}</Form.Text>
            )}
          </div>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>{t("do_you_have_gulf_experience?")}</Form.Label>
          <div className={styles.selectContainer}>
            <Select
             theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: 'rgba(246, 241, 255, 1)',
                primary: '#0045E6',
              },
            })}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  fontSize: "16px",
                  borderRadius: "8px",
                  boxShadow: "none",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: errors.gulfExperience
                    ? "rgb(228, 77, 77)"
                    : "rgba(189, 189, 189, 1)",
                  minHeight: "44px",
                  svg: {
                    path: {
                      fill: "#000",
                    },
                  },
                }),
                indicatorSeparator: () => ({ display: "none" }),
              }}
              name="gulfExperience"
              options={gulfExp}
              value={formData.gulfExperience}
              onChange={onChange}
            />
            {errors.gulfExperience && (
              <Form.Text className="error">{errors.gulfExperience}</Form.Text>
            )}
          </div>
        </Form.Group>

        <Form.Group
          className={`form-group ${errors.currentState ? "error-group" : ""}`}
        >
          <Form.Label>{t("current_state")}</Form.Label>
          <StateSelect
            countryid={101}
            onChange={(e: any) => {
              onStateChange(e.state_code);
            }}
            placeHolder="Select State"
          />
          {errors.currentState && (
            <Form.Text className="error">{errors.currentState}</Form.Text>
          )}
        </Form.Group>
      </Form>
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "10px",
          marginBottom: "0px",
        }}
      >
        {loading ? (
          <>
            <Spinner
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />{" "}
           {t('submitting')}
          </>
        ) : (
          <>{t("submit")}</>
        )}
      </Button>
    </>
  );
};

export default ProfessionalDetails;
