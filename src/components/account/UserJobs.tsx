"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Row, Col, Card, Container } from "react-bootstrap";
import styles from "../../components/account/UserJobs.module.scss";
import { Loader, NotFound } from "../common/Feedbacks";
import { FACILITIES_IMAGES, IMAGE_BASE_URL } from "@/helpers/constants";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import { useRouter } from "nextjs-toploader/app";
import { useQuery } from "@tanstack/react-query";
import { getAppliedJobs, getSavedJobs } from "@/apis/account";

type Job = {
  _id: string;
  imageUrl?: string;
  agency?: string;
  amenities: string[];
  createdAt?: string;
  expiry?: string;
};

const Jobscard: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("Portal");
  const [activeTab, setActiveTab] = useState<"applied" | "saved">("applied");

  const fetchJobs = async (): Promise<Job[]> => {
    if (activeTab === "applied") {
      const response = await getAppliedJobs();
      return response.appliedJobs || [];
    } else if (activeTab === "saved") {
      const response = await getSavedJobs();
      return response.savedJobs || [];
    }
    return [];
  };

  const { data: jobs = [], isLoading, isError, error } = useQuery({
    queryKey: ["jobs", activeTab],
    queryFn: fetchJobs,
    refetchOnWindowFocus: false,
  });

  const handleTabClick = (tab: "applied" | "saved") => {
    setActiveTab(tab);
  };

  if (isError) {
    return <div className={styles.error}>{t("error_loading_jobs") || (error as Error)?.message}</div>;
  }

  
  return (
    <Container className={styles.cardContainer}>
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${activeTab === "applied" ? styles.active : ""}`}
            onClick={() => handleTabClick("applied")}
          >
            {t('applied')}
          </div>
          <div
            className={`${styles.tab} ${activeTab === "saved" ? styles.active : ""}`}
            onClick={() => handleTabClick("saved")}
          >
            {t('saved')}
          </div>
        </div>
      </div>

      {isLoading && <Loader />}

    
      {!isLoading && jobs.length === 0 && (
        <NotFound
          text={activeTab === "applied" ? t("no_applied_jobs") : t("no_saved_jobs")}
        />
      )}

    
      {!isLoading && !isError && jobs.length > 0 && (
        <Row className="g-4">
          {jobs.map((job: Job) => (
            <Col key={job._id} md={6} lg={4} xl={3} className={styles.cardCol}>
              <Card
                className={`h-100 ${styles.jobCard}`}
                onClick={() => router.push(`/jobs/${job._id}`)}
              >
                <Image
                  src={job.imageUrl ? `${IMAGE_BASE_URL}/${job.imageUrl}` : "/no_image.jpg"}
                  alt={job._id}
                  className={styles.jobImage}
                  width={378}
                  height={378}
                  layout="responsive"
                />
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.cardTitle}>
                    {job.agency || "Unknown Agency"}
                    <Image
                      src="/icons/verified.svg"
                      width={16}
                      height={16}
                      alt="verified-logo"
                    />
                  </Card.Title>
                  <div className={styles.iconContainer}>
                    {job.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className={`${styles.iconWrapper} ${idx % 2 !== 0 ? styles.contentRight : ""}`}
                      >
                        <Image
                          src={FACILITIES_IMAGES[amenity as keyof typeof FACILITIES_IMAGES]}
                          alt={t(amenity.toLowerCase())}
                          width={16}
                          height={16}
                        />
                        <span>{t(amenity.toLowerCase())}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.jobMetaContainer}>
                    <div className={styles.jobMeta}>
                      <Image
                        src={"/icons/clock.svg"}
                        alt="Posted"
                        className="me-1"
                        width={16}
                        height={16}
                      />
                      <span>
                        {job.createdAt ? DateTime.fromISO(job.createdAt).toFormat("dd-MMM-yyyy") : "N/A"}
                      </span>
                    </div>
                    <div className={styles.jobMeta}>
                      <Image
                        src={"/icons/alarm-clock-check.svg"}
                        alt="Valid Till"
                        className="me-1"
                        width={16}
                        height={16}
                      />
                      <span>
                        {t("valid_till")}:{" "}
                        {job.expiry ? DateTime.fromISO(job.expiry).toFormat("dd-MMM-yyyy") : "N/A"}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Jobscard;
