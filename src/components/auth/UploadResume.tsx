import React, { useCallback, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "../../app/page.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useTranslations } from "next-intl";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { getSignedUrl, uploadFile } from "@/apis/common";
import toast from "react-hot-toast";
import { updateUser } from "@/apis/auth";


interface UploadResumeModalProps {
  handleClose: () => void;
  onSuccess?:()=>void;
  onCancel?:()=>void;
  onUpload?:()=>void;
  type?: "resume" | "video";
  hideTitle?:boolean;
  isReset?: {
    "resume"?:boolean,
    "video"?: boolean
  }
}

const UploadResumeModal: React.FC<UploadResumeModalProps> = ({
  handleClose,
  onSuccess,
  onCancel,
  type,
  isReset,
  hideTitle,
  onUpload
}) => {
  const t = useTranslations("Upload");

  const [cvFiles, setCvFiles] = useState<File | null>(null);
  const [videoFiles, setVideoFiles] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
 
  const onVideoDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }
    if(onUpload){
      onUpload();
    }
    setVideoFiles(file);
  }, []);

  useEffect(()=>{
    for(let key in isReset){
      if(isReset[key as "resume"]){
        if(key === "resume"){
          setCvFiles(null)
        }
        if(key === "video"){
          setVideoFiles(null)
        }
      }
    }
  
  },[isReset])

  const onCvDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }
    if(onUpload){
      onUpload();
    }
    setCvFiles(file);
  }, []);

  const uploadMedia = useCallback(async () => {
    try {
      setLoading(true);
      const medias: { type: string; file: File }[] = [] as {
        type: string;
        file: File;
      }[];
      if (cvFiles) {
        medias.push({ type: "resume", file: cvFiles });
      }
      if (videoFiles) {
        medias.push({ type: "workVideo", file: videoFiles });
      }
      const signedUrlsResp = await Promise.all(
        medias.map((media) => {
          return getSignedUrl(media.type, media.file.type);
        })
      );

      await Promise.all(
        signedUrlsResp.map(async (resp) => {
          const media = medias.find((x) => x.type === resp.type);
          await uploadFile(resp.uploadurl, media?.file!);
        })
      );

      const userPayload = signedUrlsResp.reduce(
        (obj, resp) => {
          obj[resp.type] = resp.keyName;
          return obj;
        },
        {} as {
          resume?: string;
          workVideo?: string;
        }
      );

      
        await updateUser(userPayload);
        toast.success(t("files_uploaded_securly"));
        if (onSuccess) {
          onSuccess();
        } else {
          handleClose();
        }
      } catch {
        toast.error(t("failed_to_upload"));
      } finally {
        setLoading(false);
      }
      
  },[cvFiles, videoFiles]);

  const {
    getRootProps: getCvRootProps,
    getInputProps: getCvInputProps,
    isDragActive: isCVDragActive,
    fileRejections: cvRejections,
  } = useDropzone({
    onDrop: onCvDrop,
    maxSize: 5 * 1024 * 1024, //50 MB
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
    },
  });

  const {
    getRootProps: getVideoRootProps,
    getInputProps: getVideoInputProps,
    isDragActive,
    fileRejections: videoRejections
  } = useDropzone({
    onDrop: onVideoDrop,
    maxSize: 50 * 1024 * 1024, //50 MB
    accept: {
      "video/*": [],
    },
  });

  return (
    <>
      {
        !hideTitle && <>  <Modal.Title className={styles.modalTitle4}>
        {t("upload_your_resume")}
      </Modal.Title>
      <p className={styles.modalDescription}>
        {t("you_can_upload_your_cv_to_find_relevant_jobs_and_recommended_jobs_from")}
      </p>
                </>
      }
    
     
      {(type === "resume" || !type) && (
        <div className={styles.uploadBox} {...getCvRootProps()}>
          <input {...getCvInputProps()} />
          <h5 className={styles.uploadTitle}>
            {" "}
            {isCVDragActive ? t("drop_file") : t("upload_your_cv")}
          </h5>
          <p
            className={`${styles.uploadDescription} ${
              cvRejections.length > 0 ? styles.error : ""
            }`}
          >
            {t("pdf_docx")}
          </p>

          {cvFiles && cvRejections.length == 0 ? (
            <>
              <p>{cvFiles.name}</p> <div className={styles.successBar}></div>
            </>
          ) : (
            <Button
              variant="outline-primary"
              className={styles.chooseFileButton}
            >
              <Image src="/upload.png" width={16} height={16} alt="" />
              {t("choose_file")}
            </Button>
          )}
        </div>
      )}

      {(type === "video" || !type) && (
        <div className={styles.uploadBox} {...getVideoRootProps()}>
          <input {...getVideoInputProps()} />
          <h5 className={styles.uploadTitle}>
            {isDragActive
              ? "Drop the files here ..."
              : t("upload_your_work_video")}
          </h5>
          <p
            className={`${styles.uploadDescription} ${
              videoRejections.length > 0 ? styles.error : ""
            }`}
          >
            {t("upload_a_video_of_your_work")}
          </p>
          <div className={styles.dropzone}>
            {videoFiles && videoRejections.length == 0 ? (
              <>
                <p>{videoFiles.name}</p>{" "}
                <div className={styles.successBar}></div>
              </>
            ) : (
              <Button
                variant="outline-primary"
                className={styles.chooseFileButton}
              >
                <Image src="/upload.png" width={16} height={16} alt="" />
                {t("choose_file")}
              </Button>
            )}
          </div>
        </div>
      )}
      {type ? (
        <Modal.Footer
          className={`${styles.uploadActions} ${styles.uploadModalFooter}`}
        >
          <div className={styles.uploadActions}>
          <a className={styles.skipButton} onClick={onCancel}>
              {t('cancel')}
            </a>
            <Button
              className={`btn ${loading ? "btn-loading" : ""} ${
                styles.getStartedButton
              }`}
              disabled={loading || (!cvFiles && !videoFiles)}
              onClick={uploadMedia}
            >
             {loading ? <div className="spinner"></div> : t('upload')}
              
            </Button>
          </div>
        </Modal.Footer>
      ) : (
        <Modal.Footer
          className={`${styles.uploadActions} ${styles.modalFooter}`}
        >
          <div className={styles.uploadActions}>
            <a className={styles.skipButton} onClick={handleClose}>
              {t("skip")}
            </a>
            <Button
              className={`btn ${loading ? "btn-loading" : ""} ${
                styles.getStartedButton
              }`}
              disabled={loading || (!cvFiles && !videoFiles)}
              onClick={uploadMedia}
            >
              {loading ? <div className="spinner"></div> : t("get_started")}
            </Button>
          </div>
        </Modal.Footer>
      )}
    </>
  );
};

export default UploadResumeModal;
