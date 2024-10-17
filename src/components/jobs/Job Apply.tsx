
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./JobApply.module.scss";
import UploadResume from "../../components/auth/UploadResume";
import { useTranslations } from "next-intl";

type EasyApplyModalProps = {
  show: boolean;
  onHide: () => void;
  selectedPosition?: string;
};

const JobApply: React.FC<EasyApplyModalProps> = ({ show, onHide, selectedPosition }) => {
  const t = useTranslations("JobApply");
  const [selectedOption, setSelectedOption] = useState<string>("existing");
  const [showUploadResume, setShowUploadResume] = useState(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setShowUploadResume(option === "new");
  };

  return (
    <Modal show={show} onHide={onHide} centered dialogClassName={styles.modalDialog}>
      <Modal.Header className={styles.modalHeader} closeButton></Modal.Header>

      {!showUploadResume && (
        <Modal.Title className={styles.modalTitleApply}>{t('Apply_to_this_Job')}</Modal.Title>
      )}

      <Modal.Body className={styles.modalBody}>
        {showUploadResume ? (
          <UploadResume handleClose={onHide} />
        ) : (
          <>
            <h5 className={styles.applyingFor}>{t('Applying_for')}</h5>
            <p className={styles.jobTitle}>{selectedPosition || "Job Position"}</p> 

            <h6 className={styles.selectLabel}>Select</h6>
            <div className={styles.optionContainer}>
              <div
                className={`${styles.option} ${selectedOption === "existing" ? styles.selected : ""}`}
                onClick={() => handleOptionChange("existing")}
              >
                <div className={styles.optionBody}>
                  <div className={styles.optionHeader}>
                  <h5>{t('Apply_Using_Existing_CV')}</h5>

                    <span className={styles.optionDate}>Last Updated 12-Jun-2024</span>
                  </div>
                  {selectedOption === "existing" && (
       <img src="/check-box.png" alt="Selected" className={styles.checkIcon} />
        )}

                </div>
              </div>

              <div
                className={`${styles.option} ${selectedOption === "new" ? styles.selected : ""}`}
                onClick={() => handleOptionChange("new")}
              >
                <div className={styles.optionBody}>
                  <div className={styles.optionHeader}>
                    <h5>{t('Upload_New_CV')}</h5>
                    <span className={styles.optionClick}>{t('Click_Here')}</span>
                  </div>
                  {selectedOption === "new" && (
      <img src="/check-box.png" alt="Selected" className={styles.checkIcon} />
      )}

                </div>
              </div>
            </div>
           
            <Form.Check
              className={styles.attachVideoCheckbox}
              label="Attach Work Video"
              id="attachVideo"
            />
          </>
        )}
      </Modal.Body>

      {!showUploadResume && (
        <Modal.Footer className={styles.modalApplyFooter}>
          <div className={styles.ApplyActions}>
            <button
              className={`${styles.cancelButton} ${styles.smallButton}`}
              onClick={onHide}
            >
              {t('cancel')}
            </button>
            <button
              className={`${styles.easyApplyButton} ${styles.smallButton}`}
            >
              {t('Easy_Apply')}
            </button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default JobApply;
