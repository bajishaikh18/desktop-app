import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../app/page.module.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useTranslations } from "next-intl";
import { useDropzone } from 'react-dropzone';

interface UploadResumeModalProps {
  onSubmit: (screen: number) => void;
}

const UploadResumeModal: React.FC<UploadResumeModalProps> = ({ onSubmit }) => {
  const t = useTranslations("Upload");

  
  const [cvFiles, setCvFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);


  const onCvDrop = (acceptedFiles: File[]) => {
    setCvFiles(acceptedFiles);  
  };

 
  const onVideoDrop = (acceptedFiles: File[]) => {
    setVideoFiles(acceptedFiles);  
  };

 
  const { getRootProps: getCvRootProps, getInputProps: getCvInputProps } = useDropzone({
    onDrop: onCvDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
    },
  });

 
  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    onDrop: onVideoDrop,
    accept: {
      'video/*': [], 
    },
  });

  return (
    <>
      <Modal.Title className={styles.modalTitle4}>{t('upload your resume')}</Modal.Title>
      <p className={styles.modalDescription}>
        {t(' you can upload your cv to find relevant jobs')}
        <br />
        <span style={{ paddingLeft: '0.3rem' }}>and recommended jobs from Wonderly.</span>
      </p>

      <div className={styles.uploadBox}>
        <h5 className={styles.uploadTitle}>{t('upload your cv')}</h5>
        <p className={styles.uploadDescription}>{t('pdf, jpeg, excel')}</p>
        <div {...getCvRootProps()}>
          <input {...getCvInputProps()} />
          <Button variant="outline-primary" className={styles.chooseFileButton}>
            <i className="fas fa-upload"></i> {t('choose file')}
          </Button>
        </div>
        {cvFiles.length > 0 && <p>{cvFiles[0].name}</p>}
      </div>

      <div className={styles.uploadBox}>
        <h5 className={styles.uploadTitle}>{t('upload your work video')}</h5>
        <p className={styles.uploadDescription}>upload a video of your work (30 seconds to 2 minutes)</p>
        <div {...getVideoRootProps()}>
          <input {...getVideoInputProps()} />
          <Button variant="outline-primary" className={styles.chooseFileButton}>
            <i className="fas fa-upload"></i> {t('choose file')}
          </Button>
        </div>
        {videoFiles.length > 0 && <p>{videoFiles[0].name}</p>}
      </div>

      <Modal.Footer className={`${styles.UploadActions} ${styles.modalFooter}`}>
        <div className={styles.UploadActions}>
          <button className={styles.skipButton}>{t('skip')}</button>
          <button className={styles.getStartedButton}>{t('get started')}</button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default UploadResumeModal;
