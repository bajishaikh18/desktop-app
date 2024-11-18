import React, { useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import styles from "../../components/Account/SettingsProfile.module.scss";

interface UploadWorkVideoProps {
  onUpload: (file: File) => void;
}

const UploadWorkVideo: React.FC<UploadWorkVideoProps> = ({ onUpload }) => {
  const [videoFiles, setVideoFiles] = useState<File | null>(null);

  const onVideoDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setVideoFiles(file);
      onUpload(file);
    }
  }, [onUpload]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop: onVideoDrop,
    maxSize: 50 * 1024 * 1024, // 50 MB
    accept: {
      "video/*": [],
    },
  });

  return (
    <div className={styles.cardContainer}>
       <h4 className={styles.modalTitleCustom}>Upload Your Resume</h4>
      <p className={styles.modalDescriptionCustom}>
        You can upload your CV to find relevant jobs and get recommendations From Wonderly.
      </p>

      <div className={styles.uploadBox} {...getRootProps()}>
        <input {...getInputProps()} />
        <h5 className={styles.uploadTitle}>
          {isDragActive ? "Drop the file here..." : "Upload your work video"}
        </h5>
        <p
  className={`${styles.Description} ${
    fileRejections.length > 0 ? styles.error : ""
  }`}
>
  <span>Upload a Video of your work minimum </span>
  <span>30 seconds to 2 minutes</span>
</p>


        {videoFiles ? (
          <>
            <p>{videoFiles.name}</p>
            <div className={styles.successBar}></div>
          </>
        ) : (
          <Button
            variant="outline-primary"
            className={styles.chooseFileButton}
          >
            <Image src="/upload.png" width={16} height={16} alt="" />
            Choose File
          </Button>
        )}
      </div>

      <div className={styles.FooterActions}>
        <Button className={styles.CancelJobButton} variant="secondary">
          Cancel
        </Button>
        <Button className={styles.easyButton} variant="secondary">
          Easy Apply
        </Button>
      </div>
    </div>
  );
};

export default UploadWorkVideo;
