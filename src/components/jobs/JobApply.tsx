import React, {  useState } from "react";
import { Modal, Form, Spinner } from "react-bootstrap";
import styles from "./JobApply.module.scss";
import UploadResume from "../auth/UploadResume";
import { useTranslations } from "next-intl";
import { IoClose } from "react-icons/io5";
import { isTokenValid } from "@/helpers/jwt";
import { useAuthUserStore } from "@/stores/useAuthUserStore";
import { DateTime } from "luxon";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { createApplication, updateApplication } from "@/apis/applications";
import toast from "react-hot-toast";
import { compact } from "lodash";

type EasyApplyModalProps = {
  id:string;
  show: boolean;
  onHide: () => void;
  selectedPosition?: string[];
  allPositions: any;
  applicationId?:string;
  appliedPositions:string[];
  onApplySuccess:() => void;
};

const JobApply: React.FC<EasyApplyModalProps> = ({
  id,
  show,
  onHide,
  allPositions,
  applicationId,
  appliedPositions,
  selectedPosition,
  onApplySuccess
}) => {
  const t = useTranslations("JobApply");  
  const [, setSelectedOption] = useState<string>("existing");
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [attachWorkVideo,setAttachWorkVideo] = useState(false);
  const [type, setType] = useState<"resume" | "video">("resume");
  const [loading,setLoading] = useState(false);
  const queryClient = useQueryClient()
  const isLogginIn = isTokenValid();
  const  {authUser} = useAuthUserStore()
  const handleOptionChange = (option: string, type: "resume" | "video") => {
    setSelectedOption(option);
    setShowUploadResume(option === "new");
    setType(type);
  };

  const onSuccess=async ()=>{
    await queryClient.invalidateQueries({
      queryKey:["userDetail",true],
      refetchType:'all'
    })
    setShowUploadResume(false)
  }

  const onCancel = ()=>{
    setShowUploadResume(false)
  }

  const handleApply= async ()=>{
    try{
      setLoading(true);
      const payload = {
        "jobId": id as string,
        "resume": authUser?.resume.keyName!,
        "userId": authUser?._id!,
        "workVideo":  attachWorkVideo ? authUser?.workVideo.keyName : undefined,
        "positions": compact([...appliedPositions,...selectedPosition!]),
      }
      if(applicationId){
        await updateApplication(applicationId,payload);
      }else{
        await createApplication(payload);
      }
      toast.success(t('application_submitted'));
      onApplySuccess();
      setLoading(false);
    }catch{
      setLoading(false);
      toast.error(t('submission_failed'));
    }
   
    

  }

  if (!isLogginIn || !authUser) {
    return false;
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName={styles.modalDialog}
      size="lg"
    >
      <Modal.Header className={styles.modalHeader}>
        {!showUploadResume ? (
          <Modal.Title className={styles.modalTitleApply}>
          {t('apply_job')}

          </Modal.Title>
        ) : (
          <Modal.Title className={styles.modalTitleApply}>
            {t('upload_your')} {type}
          </Modal.Title>
        )}
        <IoClose fontSize={22} onClick={onHide} />
      </Modal.Header>

      <Modal.Body className={styles.modalBody}>
        {showUploadResume ? (
          <UploadResume handleClose={onHide} type={type} onSuccess={onSuccess} onCancel={onCancel} />
        ) : (
          <>
            <h5 className={styles.applyingFor}>{t("applying_for")}</h5>

            <div className={styles.jobTitleCont}>
              {selectedPosition?.map((position) => (
                <p className={styles.jobTitle} key={position}>
                  {allPositions.find((pos: any) => pos._id === position)
                    ?.title || "N/A"}
                </p>
              ))}
            </div>

            <h6 className={styles.selectLabel}>{t('select')}</h6>
            <div className={styles.optionContainer}>
              {
                authUser?.resume && <div
                className={`${styles.option} ${styles.selected}`}
                onClick={() => handleOptionChange("existing", "resume")}
              >
                <div className={styles.optionBody}>
                  <div className={styles.optionHeader}>
                    <h5>{t('apply_existing_cv')}
                    </h5>

                    <span className={styles.optionDate}>
                      {t('last_updated')} {DateTime.fromISO(authUser?.resume?.uploadDate).toFormat('dd MMM yyyy')}
                    </span>
                  </div>
                    <img
                      src="/check-box.png"
                      alt="Selected"
                      className={styles.checkIcon}
                    />
                </div>
              </div>
              }
             

              <div
                className={`${styles.option}`}
                onClick={() => handleOptionChange("new", "resume")}
              >
                <div className={styles.optionBody}>
                  <div className={styles.optionHeader}>
                    <h5>{t("upload_new_cv")}</h5>
                    <span className={styles.optionClick}>
                      {t("click_here")}
                    </span>
                  </div>
                
                </div>
              </div>
            </div>
            <div className={styles.workVideo}>
            <Form.Check
              disabled={!authUser.workVideo}
              onChange={(e)=>{setAttachWorkVideo(e.target.checked)}}
              className={styles.attachVideoCheckbox}
              label={t('attach_work_video')}

              id="attachVideo"
            />
            {
              !authUser.workVideo && <Link  href={""} onClick={()=>handleOptionChange("new","video")}>{t('upload_video')}
</Link>
            }
            </div>
          </>
        )}
      </Modal.Body>

      {!showUploadResume && (
        <Modal.Footer className={styles.modalApplyFooter}>
          <div className={styles.applyActions}>
            <button
              className={`${styles.cancelButton} ${styles.smallButton}`}
              onClick={onHide}
            >
              {t("cancel")}
            </button>
            <button
              className={`${styles.easyApplyButton} ${styles.smallButton} ${!authUser?.resume?.keyName ? styles.disabled : ''}`}
              onClick={handleApply}
              disabled={!authUser?.resume?.keyName}
            >
              
              {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <>{t("easy_apply")}</>
                        )}
            </button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default JobApply;
