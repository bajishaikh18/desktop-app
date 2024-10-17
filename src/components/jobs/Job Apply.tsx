import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import styles from "./JobApply.module.scss";
import UploadResume from "../../components/auth/UploadResume";
import { useTranslations } from "next-intl";
import { IoClose } from "react-icons/io5";
import { isTokenValid } from "@/helpers/jwt";
import { useAuthUserStore } from "@/stores/useAuthUserStore";
import { DateTime } from "luxon";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getJobDetails } from "@/apis/jobs";
import { createApplication } from "@/apis/applications";
import toast from "react-hot-toast";

type EasyApplyModalProps = {
  show: boolean;
  onHide: () => void;
  selectedPosition?: string[];
  allPositions: any;
  onApplySuccess:() => void;
};

const JobApply: React.FC<EasyApplyModalProps> = ({
  show,
  onHide,
  allPositions,
  selectedPosition,
  onApplySuccess
}) => {
  const t = useTranslations("JobApply");  
  const {id} = useParams();
  const [selectedOption, setSelectedOption] = useState<string>("existing");
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
        "workVideo":  attachWorkVideo ? authUser?.resume.keyName : undefined,
        "positions": selectedPosition!,
      }
      await createApplication(payload);
      toast.success("Congratulations Your Application has been submitted to Professional Recruiters Group");
      onApplySuccess();
      setLoading(false);
    }catch(e){
      setLoading(false);
      toast.error("Something went wrong while submitting application. Please try again")
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
            {t("Apply_to_this_Job")}
          </Modal.Title>
        ) : (
          <Modal.Title className={styles.modalTitleApply}>
            Upload your {type}
          </Modal.Title>
        )}
        <IoClose fontSize={22} onClick={onHide} />
      </Modal.Header>

      <Modal.Body className={styles.modalBody}>
        {showUploadResume ? (
          <UploadResume handleClose={onHide} type={type} onSuccess={onSuccess} onCancel={onCancel} />
        ) : (
          <>
            <h5 className={styles.applyingFor}>{t("Applying_for")}</h5>

            <div className={styles.jobTitleCont}>
              {selectedPosition?.map((position) => (
                <p className={styles.jobTitle}>
                  {allPositions.find((pos: any) => pos._id === position)
                    ?.title || "N/A"}
                </p>
              ))}
            </div>

            <h6 className={styles.selectLabel}>Select</h6>
            <div className={styles.optionContainer}>
              <div
                className={`${styles.option} ${styles.selected}`}
                onClick={() => handleOptionChange("existing", "resume")}
              >
                <div className={styles.optionBody}>
                  <div className={styles.optionHeader}>
                    <h5>{t("Apply_Using_Existing_CV")}</h5>

                    <span className={styles.optionDate}>
                      Last Updated {DateTime.fromISO(authUser?.resume?.uploadDate).toFormat('dd MMM yyyy')}
                    </span>
                  </div>
                    <img
                      src="/check-box.png"
                      alt="Selected"
                      className={styles.checkIcon}
                    />
                </div>
              </div>

              <div
                className={`${styles.option}`}
                onClick={() => handleOptionChange("new", "resume")}
              >
                <div className={styles.optionBody}>
                  <div className={styles.optionHeader}>
                    <h5>{t("Upload_New_CV")}</h5>
                    <span className={styles.optionClick}>
                      {t("Click_Here")}
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
              label="Attach Work Video"
              id="attachVideo"
            />
            {
              !authUser.workVideo && <Link  href={""} onClick={()=>handleOptionChange("new","video")}>Upload work video</Link>
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
              className={`${styles.easyApplyButton} ${styles.smallButton}`}
              onClick={handleApply}
            >
              
              {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <>{t("Easy_Apply")}</>
                        )}
            </button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default JobApply;
