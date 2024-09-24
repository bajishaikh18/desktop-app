import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../app/page.module.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface UploadResumeModalProps {
  onSubmit:(screen:number)=>void
}

const UploadResumeModal: React.FC<UploadResumeModalProps> = ({ onSubmit }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleVideoUploadClick = () => {
    videoInputRef.current?.click();
  };

  return (
      <>
        <p className={styles.modalDescription}>
          You can upload your CV to find relevant jobs<br />
          <span style={{ paddingLeft: '0.3rem' }}> 
            and recommended jobs from Wonderly.
          </span>
        </p>
        
        <div className={styles.uploadBox}>
          <h5 className={styles.uploadTitle}>Upload your CV</h5>
          <p className={styles.uploadDescription}>PDF, JPEG, Excel</p>
          <Button variant="outline-primary" className={styles.chooseFileButton} onClick={handleFileUploadClick}>
            <i className="fas fa-upload"></i> Choose File
          </Button>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
        </div>

        <div className={styles.uploadBox}>
          <h5 className={styles.uploadTitle}>Upload your Work Video</h5>
          <p className={styles.uploadDescription}>Upload a video of your work (30 seconds to 2 minutes)</p>
          <div className={styles.uploadActions}>
            <Button variant="outline-primary" className={styles.chooseFileButton} onClick={handleVideoUploadClick}>
              <i className="fas fa-upload"></i> Choose File
            </Button>
            <input type="file" ref={videoInputRef} accept="video/*" style={{ display: 'none' }} />
          </div>
        </div>
        </>
  );
};

export default UploadResumeModal;
