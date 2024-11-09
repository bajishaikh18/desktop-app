import React from 'react';
import Image from 'next/image'; 
import { Card, Row, Col } from 'react-bootstrap';
import styles from './Agencies.module.scss';


interface Agency {
  logo: string;
  name: string;
  regNo: string;
  jobsPosted: number;
  validity: string;
}

const AgencyData: Agency[] = [
  {
    logo: '/falcon.png', 
    name: 'Falcon HR Consulting',
    regNo: 'B-1853/MUM/COM/1000+/5/0242/2023',
    jobsPosted: 15,
    validity: '02 Aug 2024',
  },
  {
    logo: '/continental.png', 
    name: 'Continental Holding.inc',
    regNo: 'B-2345/MUM/COM/1000+/5/0242/2023',
    jobsPosted: 27,
    validity: '02 Aug 2024',
  },
  {
    logo: '/muthuinternational.png', 
    name: 'Muthu International',
    regNo: 'B-3456/MUM/COM/1000+/5/0242/2023',
    jobsPosted: 18,
    validity: '02 Aug 2024',
  },
  {
    logo: '/Aldia.png', 
    name: 'Aldhia Human Resource',
    regNo: 'B-4567/MUM/COM/1000+/5/0242/2023',
    jobsPosted: 22,
    validity: '02 Aug 2024',
  },
  {
    logo: '/cerner.png',
    name: 'Cerner HR Consulting',
    regNo: 'B-5678/MUM/COM/1000+/5/0242/2023',
    jobsPosted: 31,
    validity: '02 Aug 2024',
  },
];

const AgencyPortal: React.FC = () => {
  return (
  
    <div className={`${styles.container} container`}> 
    
      <Card className={`${styles.mainCard} shadow-sm p-3 mb-5 bg-white rounded`}>
        {AgencyData.map((agency, index) => (
          <Card.Body 
            key={index} 
            className={`${styles.agencySection} ${index < AgencyData.length - 1 ? 'border-bottom' : ''}`} 
          >
            <Row className="align-items-center">
              <Col xs={12} md={6} className="d-flex align-items-center">
                <Image 
                  src={agency.logo} 
                  alt={agency.name} 
                  width={64} 
                  height={48} 
                  className={`${styles.logo} rounded-circle me-3`}
                />
                <div>
                  <h3 className={`${styles.companyName} h5`}>
                    {agency.name}
                    <Image 
                      src="/check-verified-02.png" 
                      alt="Verified" 
                      width={24} 
                      height={24} 
                      className={`${styles.verifiedIcon} ms-2`}
                    />
                  </h3>
                  <p className={`${styles.regNo} text-muted small mb-0`}>REG No: {agency.regNo}</p>
                </div>
              </Col>
              <Col xs={12} md={2} className="d-flex align-items-center justify-content-start">
                <Image 
                  src="/posted.png" 
                  alt="Jobs Posted" 
                  width={16} 
                  height={14.4} 
                  className={`${styles.jobsPostedIcon} me-2`}
                /> 
                <p className={`${styles.jobsPosted} mb-0`}>{agency.jobsPosted} Jobs Posted</p>
              </Col>
              <Col xs={12} md={2} className="d-flex align-items-center justify-content-start">
                <Image 
                  src="/alarm-clock-check.png" 
                  alt="Valid Till" 
                  width={20} 
                  height={18} 
                  className={`${styles.alarmIcon} me-2`}
                />
                <p className={`${styles.validity} mb-0`}>Valid up to {agency.validity}</p>
              </Col>
              <Col xs={12} md={2} className="d-flex text-end align-items-center">
                <button className={styles.viewJobsButton}>
                  View Job
                </button>
              </Col>
            </Row>
          </Card.Body>
        ))}
      </Card>
    </div>
    
  );
};

export default AgencyPortal;
