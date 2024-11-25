"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Row, Col, Card, Container } from "react-bootstrap";
import styles from "../../components/account/UserJobs.module.scss";
import { Loader, NotFound } from "../common/Feedbacks";
import { FACILITIES_IMAGES, IMAGE_BASE_URL } from "@/helpers/constants";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import { useRouter } from "nextjs-toploader/app";
import { getAppliedJobs, getSavedJobs } from "@/apis/account"; 

const Jobscard: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("Portal");

  const [activeTab, setActiveTab] = useState("applied");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchingJobs, setFetchingJobs] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchJobs = async () => {
     
      if (fetchingJobs || loading) return;

      setFetchingJobs(true);
      setLoading(true);
      setError(null);

      try {
        let fetchedJobs;
        if (activeTab === "applied") {
          console.log("Fetching applied jobs...");
          const appliedJobsResponse = await getAppliedJobs();
          console.log("Applied jobs fetched:", appliedJobsResponse);
          fetchedJobs = appliedJobsResponse.appliedJobs;
        } else if (activeTab === "saved") {
          console.log("Fetching saved jobs...");
          const savedJobsResponse = await getSavedJobs();
          console.log("Saved jobs fetched:", savedJobsResponse);
          fetchedJobs = savedJobsResponse.savedJobs;

          if (savedJobsResponse.savedJobs.length === 0) {
            setError("No saved jobs found.");
          }
        }
        setJobs(fetchedJobs);
      } catch (err: any) {
        console.error("Failed to fetch jobs:", err);
        setError("Failed to fetch jobs.");
      } finally {
        setLoading(false);
        setFetchingJobs(false); 
      }
    };

    fetchJobs();
  }, [activeTab]); 

  

  if (jobs.length === 0 && !loading && !error) {
    return <NotFound text={activeTab === "applied" ? t("no_applied_jobs") : t("no_saved_jobs")} />;
  }

  return (
    <Container className={`${styles.cardContainer}`}>
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${activeTab === "applied" ? styles.active : ""}`}
            onClick={() => handleTabClick("applied")}
          >
            Applied
          </div>
          <div
            className={`${styles.tab} ${activeTab === "saved" ? styles.active : ""}`}
            onClick={() => handleTabClick("saved")}
          >
            Saved
          </div>
        </div>
      </div>

      {loading && <Loader />}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && !error && jobs.length === 0 && (
        <div>{activeTab === "applied" ? t("no_applied_jobs") : t("no_saved_jobs")}</div>
      )}

      <Row className="g-4">
        {!loading &&
          !error &&
          jobs.map((job, index) => (
            <Col key={index} md={6} lg={4} xl={3} className={styles.cardCol}>
              <Card
                className={`h-100 ${styles.jobCard}`}
                onClick={() => {
                  router.push(`/jobs/${job._id}`);
                }}
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
                    {job?.agency || "Unknown Agency"}
                    <Image
                      src="/icons/verified.svg"
                      width={16}
                      height={16}
                      alt="verified-logo"
                    />
                  </Card.Title>
                  <div className={styles.iconContainer}>
                    {job.amenities.map((amenity: string, idx: number) => (
                      <div
                        key={idx}
                        className={`${styles.iconWrapper} ${
                          idx % 2 !== 0 ? styles.contentRight : ""
                        }`}
                      >
                        <Image
                          src={
                            FACILITIES_IMAGES[
                              amenity as keyof typeof FACILITIES_IMAGES
                            ]
                          }
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
                        {job.createdAt
                          ? DateTime.fromISO(job.createdAt).toFormat("dd-MMM-yyyy")
                          : "N/A"}
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
                        {job.expiry
                          ? DateTime.fromISO(job.expiry).toFormat("dd-MMM-yyyy")
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Jobscard;
