import React, { useState } from "react";
import UploadResumeModal from "../auth/UploadResume"; 
import styles from "../../components/account/SettingsProfile.module.scss";

import { Modal } from "react-bootstrap";
import { useTranslations } from "next-intl";
import uploadStyles from "../../app/page.module.scss";

const UploadCV: React.FC = () => {
  const [reset,setReset]= useState(false);
  
  const t = useTranslations("Upload");

  const resetObj = {
    resume: reset
  }
  const onSuccess = ()=>{
    setReset(true)
  }
  return (
    <div className={styles.cardContainer}>
     <Modal.Title className={uploadStyles.modalTitle4}>
        {t("upload_your_resume")}
      </Modal.Title>
      <p className={uploadStyles.modalDescription}>
        {t("you_can_upload_your_cv_to_find_relevant_jobs_and_recommended_jobs_from")}
      </p>
      <UploadResumeModal
        handleClose={() => {}}  
        onSuccess={onSuccess}    
        onCancel={() => {setReset(true)}}      
        type="resume"   
        onUpload={()=>setReset(false)} 
        isReset={resetObj}  
        hideTitle={true}      
      />
    </div>
  );
};

export default UploadCV;
