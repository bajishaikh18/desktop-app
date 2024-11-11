import React from 'react';
import Image from 'next/image';
import { Card, Row, Col } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'nextjs-toploader/app';
import styles from './Agencies.module.scss';
import { getAgencies } from '@/apis/agency';
import { Loader, NotFound } from "../common/Feedbacks";

interface Agency {
  logo: string;
  name: string;
  regNo: string;
  jobsPosted: number;
  validity: string;
  id: string;
}

const fetchAgencies = async () => {
  const response = await getAgencies({
    page: 1,
    fetchSize: 10,
    filters: {}
  });

  console.log("API Response:", response); 
  return response.data;
};

const AgencyPortal: React.FC = () => {
  const router = useRouter();
  const { data, isLoading, error } = useQuery<Agency[], Error>({
    queryKey: ['agencies'],
    queryFn: fetchAgencies,
  });

  if (isLoading) {
    return <Loader text="Fetching agency details" />;
  }

  if (error) {
    console.error("Error fetching agencies:", error);
    return <NotFound text="There was an error loading the agencies" />;
  }

  console.log("Fetched data:", data); 

  return (
    <div className={`${styles.container} container`}>
      {data && data.length > 0 ? (
        <Card className={`${styles.mainCard} shadow-sm p-3 mb-5 bg-white rounded`}>
          {data.map((agency: Agency, index: number) => (
            <Card.Body
              key={index}
              className={`${styles.agencySection} ${index < data.length - 1 ? 'border-bottom' : ''}`}
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
                  <button
                    className={styles.viewJobsButton}
                    onClick={() => router.push(`/agency/${agency.id}`)}
                  >
                    View Job
                  </button>
                </Col>
              </Row>
            </Card.Body>
          ))}
        </Card>
      ) : (
        <NotFound text="No agencies found" />
      )}
    </div>
  );
};

export default AgencyPortal;
