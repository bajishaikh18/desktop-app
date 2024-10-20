import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import styles from "./JobDetail.module.scss";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Dropdown,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { DateTime } from "luxon";
import Link from "next/link";
import { BsCheckCircleFill, BsThreeDots } from "react-icons/bs";
import {
  COUNTRIES,
  FACILITIES_IMAGES,
  IMAGE_BASE_URL,
} from "@/helpers/constants";
import { FullScreenImage } from "../common/FullScreenImage";
import { Loader, NotFound } from "../common/Feedbacks";
import Spinner from 'react-bootstrap/Spinner';
import { LuExpand } from "react-icons/lu";
import { getJobDetails, saveJob } from "@/apis/jobs";
import { truncateText } from "@/helpers/truncate";
import { JobPositions } from "./JobPositions";
import { CurrencyConverter } from "./CurrencyConverter";
import JobApply from "./Job Apply";
import { useAuthUserStore } from "@/stores/useAuthUserStore";
import { isTokenValid } from "@/helpers/jwt";
import { useReponsiveStore } from "@/stores/useResponsiveStore";

type PostedJobDetailsProps = {
  jobId: string;
};

const JobDetails: React.FC<PostedJobDetailsProps> = ({ jobId }) => {
  const t = useTranslations("Details");
  const [selectedPosition, setSelectedPosition] = useState<string[] | []>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false); 
  const { setOpenLogin } = useAuthUserStore();
  const isLoggedIn = isTokenValid();
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobDetails", jobId],
    queryFn: () => {
      if (jobId) {
        return getJobDetails(jobId);
      }
      throw new Error("jobId is null or undefined");
    },
    enabled: !!jobId,
  });

  const {
    _id,
    agencyId,
    createdAt,
    expiry,
    agencyName,
    imageUrl,
    location,
    positions,
    contactNumbers,
    email,
    status,
    applied,
    description,
    amenities,
  } = data?.job || {};

  const {isDesktop,isTab,isMobile} = useReponsiveStore();

  const goBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <main className="main-section">
        <Loader text="Loading job details" />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="main-section">
        <NotFound text="Oops!, looks like job details are not present" />
      </main>
    );
  }
  if (isError) {
    return (
      <main className="main-section">
        <NotFound text="Something went wrong while accessing job details. Please try again" />
      </main>
    );
  }

  const handlePositionSelect = (positionId: string, checked: boolean) => {
    let selectedPos;
    if (checked) {
      selectedPos = [...selectedPosition, positionId];
    } else {
      selectedPos = selectedPosition.filter((x) => x !== positionId);
    }
    setSelectedPosition(selectedPos);
  };

  const openModal = () => {
    if (selectedPosition && isLoggedIn) {
      setShowApplyModal(true);
    } else {
      setOpenLogin(true);
    }
  };

  const onSuccess = () => {
    setShowSuccess(true);
    setShowApplyModal(false);
  };
 
  const handleSaveJob = async () => {
    setIsSaving(true);
    try {
      await saveJob(jobId); 
     alert("Job saved successfully!");
    } catch (error) {
      console.error("Failed to save job:", error);
      alert("Failed to save job. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderJobPositions = () => (
    <JobPositions
      positions={positions}
      onPositionSelect={handlePositionSelect}
    />
  );

  return (
    <main className="main-section">
      <Container fluid>
        <Row>
          <Col lg={4} className="p-0">
            <Card className={styles.summaryCard}>
              {
                !isDesktop && <CardHeader className={styles.cardHeader}>
                <div
                  className={`${styles.detailsCardHeader} ${styles.cardActionsHeader}`}
                >
                  <h3 onClick={goBack} className={styles.backlink}>
                    <FaChevronLeft fontSize={16} color="#000" />
                    Job Posting Details
                  </h3>
                  <div className={styles.actionContainer}>
                    <Dropdown>
                      <Dropdown.Toggle
                        className={styles.dropdownButton}
                        variant="success"
                        id="dropdown-basic"
                      >
                        <BsThreeDots fontSize={24} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {}}>
                          {t("Save_Job")}
                        </Dropdown.Item>
                        <Dropdown.Item className="danger" onClick={() => {}}>
                          {t("Report_Job")}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                
              </CardHeader>
              }
           
              <CardBody className={styles.summaryCardBody}>
                <div className={styles.imageContainer}>
                  <Image
                    src={`${
                      imageUrl
                        ? `${IMAGE_BASE_URL}/${imageUrl}`
                        : "/no_image.jpg"
                    }`}
                    alt="Rectangle"
                    height={0}
                    blurDataURL="/no_image.jpg"
                    width={800}
                    style={{ height: "auto", width: "100%" }}
                    className={styles.buttonIcon}
                  />
                  <button className="expand-button">
                    <LuExpand size={25} onClick={() => setIsFullScreen(true)} />
                  </button>
                </div>
                {
                  !isDesktop && <div className={styles.detailsCardHeader}>
                  <div className={styles.agencyDetails}>
                    <Image
                      src="/icons/agency-logo.png"
                      width={66}
                      height={66}
                      alt="agency-logo"
                    />
                    <div>
                      <div className={styles.agencyNameContainer}>
                        <h2 className={styles.agencyName}>{agencyId.name}</h2>
                        <Image
                          src="/icons/verified.svg"
                          width={13}
                          height={13}
                          alt="verified-logo"
                        />
                      </div>
                      <p className="d-none d-sm-block">
                        Approved by Ministry of external affairs Govt of India
                      </p>
                    </div>
                  </div>
                  <div className={styles.location}>
                    <Image
                      src={"/icons/location.svg"}
                      width={18}
                      height={18}
                      alt="location"
                    />
                    {COUNTRIES[location as "bh"]?.label || location || "N/A"}
                  </div>
                </div>
                }
                <div className={styles.summaryDetailsSection}>
                  <h3>Job Details</h3>
                  <p>
                    {description ? (
                      <>
                        {showFullText ? (
                          <>
                            {description}
                            <Link
                              href={""}
                              onClick={() => setShowFullText(false)}
                            >
                              {t("hide")}
                            </Link>{" "}
                          </>
                        ) : (
                          <>
                            {truncateText(description, 100)}
                            <Link
                              href={""}
                              onClick={() => setShowFullText(true)}
                            >
                              {t("Read_More")}
                            </Link>{" "}
                          </>
                        )}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </p>
                </div>

                <div className={styles.summaryDetailsSection}>
                  <h3 className="d-none d-sm-block">
                    <span className={styles.label}>{t("Hiring_Organization")}</span>
                    <span>{agencyId.name}</span>
                  </h3>
                  <ul className={styles.benefits}>
                    {amenities.map((amenity: string, index: number) => (
                      <li key={index}>
                        <Image
                          src={FACILITIES_IMAGES[amenity as "Food"]}
                          alt={amenity}
                          width={16}
                          height={16}
                        />{" "}
                        <span>
                          {amenity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className={styles.footerInfo}>
                  <li>
                    <Image
                      src={"/icons/clock.svg"}
                      width={18}
                      height={18}
                      alt="clock"
                    />
                    <span>{DateTime.fromISO(createdAt).toRelative()}</span>
                  </li>
                  <li>
                    <Image
                      src={"/icons/expiry-icon.svg"}
                      width={18}
                      height={18}
                      alt="expiry"
                    />
                     <span>
                    Valid till{" "}
                   {DateTime.fromISO(expiry).toFormat("dd-MMM-yyyy")}</span>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>
          <Col lg={8} className={styles.detailsColumn}>
            <Card className={styles.detailsCard}>
              {
                isDesktop &&  <CardHeader className={styles.cardHeader}>
                <div
                  className={`${styles.detailsCardHeader} ${styles.cardActionsHeader}`}
                >
                  <h3 onClick={goBack} className={styles.backlink}>
                    <FaChevronLeft fontSize={16} color="#000" />
                    Job Posting Details
                  </h3>
                  <div className={styles.actionContainer}>
                    <Dropdown>
                      <Dropdown.Toggle
                        className={styles.dropdownButton}
                        variant="success"
                        id="dropdown-basic"
                      >
                        <BsThreeDots fontSize={24} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {}}>
                          {t("Save_Job")}
                        </Dropdown.Item>
                        <Dropdown.Item className="danger" onClick={() => {}}>
                          {t("Report_Job")}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className={styles.detailsCardHeader}>
                  <div className={styles.agencyDetails}>
                    <Image
                      src="/icons/agency-logo.png"
                      width={66}
                      height={66}
                      alt="agency-logo"
                    />
                    <div>
                      <div className={styles.agencyNameContainer}>
                        <h2 className={styles.agencyName}>{agencyId.name}</h2>
                        <Image
                          src="/icons/verified.svg"
                          width={13}
                          height={13}
                          alt="verified-logo"
                        />
                      </div>
                      <p>
                        Approved by Ministry of external affairs Govt of India
                      </p>
                    </div>
                  </div>
                  <div className={styles.location}>
                    <Image
                      src={"/icons/location.svg"}
                      width={18}
                      height={18}
                      alt="location"
                    />
                    {COUNTRIES[location as "bh"]?.label || location || "N/A"}
                  </div>
                </div>
              </CardHeader>
              }
             
              <CardBody className={styles.detailsCardBody}>
                <div className={styles.tabContainer}>
                  <Tabs variant="pills" className={styles.navPills} defaultActiveKey="home" id="jobDetailTab">
                    <Tab eventKey="home" title="Positions">
                      {renderJobPositions()}
                    </Tab>
                    {
                      !isMobile && <Tab eventKey="profile" title="About Recruiter">
                      {t("Tab_content_for_Profile")}
                    </Tab>
                    }{
                      !isMobile &&<Tab eventKey="contact" title="More Info">
                      {t("Tab_content_for_Contact")}
                    </Tab>
                    
                    
                    }
                   
                  </Tabs>
                </div>
                {COUNTRIES[location as "bh"] && (
                  <CurrencyConverter
                    currency={COUNTRIES[location as "bh"].currency}
                    country={COUNTRIES[location as "bh"].label}
                    jobId={jobId}  
                  />
                )}
                <div className={styles.jobActions}>
                  {(showSuccess || applied) ? (
                    <div className={styles.successMessage}>
                      <BsCheckCircleFill /> You’ve successfully applied for this job
                    </div>
                  ) : (
                    <>
                    <Button className={styles.saveJobButton} variant="secondary"
                        onClick={handleSaveJob}
                            disabled={isSaving} >
                           {isSaving ? (
                          <>
                     <Spinner animation="border" size="sm" />
                     <span className="ms-2"></span>
                        </>
                      ) : (
                        t("Save_Job")
                         )}
                      </Button>
                  
                  <Button
                        className={styles.easyApplyButton}
                        onClick={openModal}
                        disabled={selectedPosition.length === 0}
                      >
                        {t("Easy_Apply")}
                      </Button>

                    </>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {showApplyModal && (
        <JobApply
          show={showApplyModal}
          onHide={() => {setShowApplyModal(false)}}
          onApplySuccess={onSuccess}
          selectedPosition={selectedPosition}
          allPositions={positions}
        />
      )}

      <FullScreenImage
        isOpen={isFullScreen}
        handleClose={() => {
          setIsFullScreen(false);
        }}
        imageUrl={imageUrl}
      />
    </main>
  );
};

export default JobDetails;
