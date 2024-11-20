import React from "react";
import UploadResumeModal from "../../components/auth/UploadResume"; 
import styles from "../../components/Account/SettingsProfile.module.scss";

const UploadCV: React.FC = () => {
  return (
    <div className={styles.cardContainer}>
     
      <UploadResumeModal
        handleClose={() => {}}  
        onSuccess={() => {}}    
        onCancel={() => {}}      
        type="resume"            
      />
    </div>
  );
};

export default UploadCV;
