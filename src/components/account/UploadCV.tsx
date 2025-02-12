import React, { useEffect, useState } from "react";
import UploadResumeModal from "../auth/UploadResume"; 
import styles from "../../components/account/SettingsProfile.module.scss";
import { DateTime } from "luxon";
import { useAuthUserStore } from "@/stores/useAuthUserStore";
import { Modal } from "react-bootstrap";
import { useTranslations } from "next-intl";
import uploadStyles from "../../app/page.module.scss";

const UploadCV: React.FC = () => {
  const [reset,setReset]= useState(false);
  
  const t = useTranslations("Upload");
  const tjp = useTranslations("JobApply");
 const { authUser } = useAuthUserStore();
 const [resumeDate,setResumeDate]=useState<string|undefined>("");
 
 useEffect(()=>{
  setResumeDate(authUser?.resume?.uploadDate.toString());
 },[authUser])

  const resetObj = {
    resume: reset
  }
  const onSuccess = ()=>{
    setReset(true);
    setResumeDate(new Date().toString() as string)
  }
  return (
    <div className={styles.cardContainer}>
     <Modal.Title className={uploadStyles.modalTitle4}>
        {t("upload_your_resume")}
      </Modal.Title>
      <p className={uploadStyles.modalDescription}>
        {t("you_can_upload_your_cv_to_find_relevant_jobs_and_recommended_jobs_from")}
      </p>
      {
        authUser?.resume?.uploadDate &&
         
        <div className={styles.option}>
        <div className={styles.optionContainer}>
        <div className={styles.optionBody}> <div className={styles.optionHeader}>
                    <h5>{authUser?.firstName} {authUser?.lastName}.{authUser?.resume?.keyName.split('.').pop()}
                    </h5>

                    <span className={styles.optionDate}>
                    {tjp('last_updated')} {DateTime.fromISO(resumeDate as string).toFormat('dd MMM yyyy')}
                    </span>
                  </div> 
                  </div> 
                  </div>
                  </div>
                 // </p>
}
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
