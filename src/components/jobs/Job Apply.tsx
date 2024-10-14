import React, { useState } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import styles from "./JobApply.module.scss";
import UploadResume from "../../components/auth/UploadResume";

type EasyApplyModalProps = {
  show: boolean;
  onHide: () => void;
};

const EasyApplyModal: React.FC<EasyApplyModalProps> = ({ show, onHide }) => {
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
        <Modal.Title className={styles.modalTitleApply}>Apply to this Job</Modal.Title>
      )}

      <Modal.Body className={styles.modalBody}>
        {showUploadResume ? (
          <UploadResume handleClose={onHide} />
        ) : (
          <>
            <h5 className={styles.applyingFor}>Applying for</h5>
            <p className={styles.jobTitle}>Filling Machine</p>

            <h6 className={styles.selectLabel}>Select</h6>
            <div className={styles.optionContainer}>
             
              <div
                className={`${styles.option} ${selectedOption === "existing" ? styles.selected : ""}`}
                onClick={() => handleOptionChange("existing")}
              >
                <div className={styles.optionBody}>
                  <div className={styles.optionHeader}>
                    <h5>Apply Using Existing CV</h5>
                    <span className={styles.optionDate}>Last Updated 12-Jun-2024</span>
                  </div>
                 
                  {selectedOption === "existing" && (
                    <span className={styles.checkIcon}>✔️</span>
                  )}
                </div>
              </div>

            
              <div
                className={`${styles.option} ${selectedOption === "new" ? styles.selected : ""}`}
                onClick={() => handleOptionChange("new")}
              >
                <div className={styles.optionBody}>
                  <div className={styles.optionHeader}>
                    <h5>Upload New CV</h5>
                    <span className={styles.optionClick}>Click Here</span>
                  </div>
                 
                  {selectedOption === "new" && (
                    <span className={styles.checkIcon}>✔️</span>
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
              Cancel
            </button>
            <button
              className={`${styles.easyApplyButton} ${styles.smallButton}`}
            >
              Easy Apply
            </button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default EasyApplyModal;
