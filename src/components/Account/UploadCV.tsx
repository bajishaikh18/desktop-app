import React, { useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import styles from "../../components/Account/SettingsProfile.module.scss";

interface UploadCVProps {
  onUpload: (file: File) => void;
}

const UploadCV: React.FC<UploadCVProps> = ({ onUpload }) => {
  const [cvFiles, setCvFiles] = useState<File | null>(null);

  const onCvDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setCvFiles(file);
        onUpload(file);
      }
    },
    [onUpload]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop: onCvDrop,
    maxSize: 5 * 1024 * 1024, // 5 MB
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
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
          {isDragActive ? "Drop the file here..." : "Upload your CV"}
        </h5>
        <p
          className={`${styles.uploadDescription} ${
            fileRejections.length > 0 ? styles.error : ""
          }`}
        >
          PDF, JPEG, Excel
        </p>

        {cvFiles ? (
          <>
            <p>{cvFiles.name}</p>
            <div className={styles.successBar}></div>
          </>
        ) : (
          <Button variant="outline-primary" className={styles.chooseFileButton}>
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

export default UploadCV;
