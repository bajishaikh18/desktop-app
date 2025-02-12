import React, { useEffect, useState } from "react";
import UploadResumeModal from "../auth/UploadResume"; 
import styles from "../../components/account/SettingsProfile.module.scss";
import uploadStyles from "../../app/page.module.scss";
import { Modal } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { DateTime } from "luxon";
import { useAuthUserStore } from "@/stores/useAuthUserStore";

const UploadWorkVideo: React.FC = () => {
  const [reset,setReset]= useState(false);
  
  const t = useTranslations("Upload");
  const tjp = useTranslations("JobApply");
 const { authUser } = useAuthUserStore();
 const [workVideo,setWorkVideo]=useState<string|undefined>("");
 
 useEffect(()=>{
  setWorkVideo(authUser?.workVideo?.uploadDate.toString());
 },[authUser])
  const resetObj = {
    video: reset
  }
  const onSuccess = ()=>{
    setReset(true);
    
    setWorkVideo(new Date().toString() as string)
  }

  return (
    <div className={styles.cardContainer}>
      <Modal.Title className={uploadStyles.modalTitle4}>
        {t("upload_your_work_video")}
      </Modal.Title>
      <p className={uploadStyles.modalDescription}>
        {t("upload_a_video_of_your_work")}
      </p>
      {
        authUser?.workVideo?.uploadDate &&
         
        <div className={styles.option}>
        <div className={styles.optionContainer}>
        <div className={styles.optionBody}> <div className={styles.optionHeader}>
                    <h5>{authUser?.firstName} {authUser?.lastName}.{authUser?.workVideo?.keyName.split('.').pop()}
                    </h5>

                    <span className={styles.optionDate}>
                    {tjp('last_updated')} {DateTime.fromISO(workVideo as string).toFormat('dd MMM yyyy')}
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
        onUpload={()=>setReset(false)} 
        isReset={resetObj}   
        type="video"      
        hideTitle={true}      
      />
    </div>
  );
};

export default UploadWorkVideo;
