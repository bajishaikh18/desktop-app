import React from "react";
import UploadResumeModal from "../auth/UploadResume"; 
import styles from "../../components/account/SettingsProfile.module.scss";

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
