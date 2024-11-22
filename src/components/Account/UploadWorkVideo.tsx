import React from "react";
import UploadResumeModal from "../auth/UploadResume"; 
import styles from "../../components/Account/SettingsProfile.module.scss";

const UploadWorkVideo: React.FC = () => {
  return (
    <div className={styles.cardContainer}>
      
      <UploadResumeModal
        handleClose={() => {}}  
        onSuccess={() => {}}     
        type="video"            
      />
    </div>
  );
};

export default UploadWorkVideo;
