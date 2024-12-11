import React, { useState } from "react";
import UploadResumeModal from "../auth/UploadResume"; 
import styles from "../../components/account/SettingsProfile.module.scss";
import uploadStyles from "../../app/page.module.scss";
import { Modal } from "react-bootstrap";
import { useTranslations } from "next-intl";


const UploadWorkVideo: React.FC = () => {
  const [reset,setReset]= useState(false);
  
  const t = useTranslations("Upload");

  const resetObj = {
    video: reset
  }
  const onSuccess = ()=>{
    setReset(true)
  }

  return (
    <div className={styles.cardContainer}>
      <Modal.Title className={uploadStyles.modalTitle4}>
        {t("upload_your_work_video")}
      </Modal.Title>
      <p className={uploadStyles.modalDescription}>
        {t("upload_a_video_of_your_work")}
      </p>
      <UploadResumeModal
        handleClose={() => {}}  
        onSuccess={onSuccess}    
        onCancel={() => {setReset(true)}}  
        onUpload={()=>setReset(false)} 
        isReset={resetObj}   
        type="video"      
        hideTitle={true}      
      />
    </div>
  );
};

export default UploadWorkVideo;
