"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./JobDetail.module.scss";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Dropdown,
  Modal,
  NavDropdown,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { DateTime } from "luxon";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import {
  COUNTRIES,
  FACILITIES_IMAGES,
  IMAGE_BASE_URL,
} from "@/helpers/constants";
import { FullScreenImage } from "../common/FullScreenImage";
import { Loader, NotFound } from "../common/Feedbacks";
import { LuExpand } from "react-icons/lu";
import { getJobDetails } from "@/apis/jobs";
import { truncateText } from "@/helpers/truncate";
import { JobPositions } from "./JobPositions";
import { CurrencyConverter } from "./CurrencyConverter";

type PostedJobDetailsProps = {
  jobId: string;
};

const JobDetails: React.FC<PostedJobDetailsProps> = ({ jobId }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
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
    createdAt,
    expiry,
    agencyName,
    imageUrl,
    location,
    positions,
    contactNumbers,
    email,
    status,
    description,
    amenities,
  } = data?.job || {};

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

  return (
    <main className="main-section">
      <Container fluid>
        <Row>
          <Col lg={4} className="p-0">
            <Card className={styles.summaryCard}>
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
                <div className={styles.summaryDetailsSection}>
                  <h3>Job Details</h3>
                  <p>
                    {showFullText ? (
                      <>
                        {description}
                        <Link href={""} onClick={() => setShowFullText(false)}>
                          Hide
                        </Link>{" "}
                      </>
                    ) : (
                      <>
                        {truncateText(description, 100)}
                        <Link href={""} onClick={() => setShowFullText(true)}>
                          Read More
                        </Link>{" "}
                      </>
                    )}
                  </p>
                </div>

                <div className={styles.summaryDetailsSection}>
                  <h3>
                    <span>Hiring Organization</span>Continental Holdings
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
                        {amenity}
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
                    {DateTime.fromISO(createdAt).toRelative()}
                  </li>
                  <li>
                    <Image
                      src={"/icons/expiry-icon.svg"}
                      width={18}
                      height={18}
                      alt="expiry"
                    />
                    Valid till{" "}
                    {DateTime.fromISO(expiry).toFormat("dd-MMM-yyyy")}
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>
          <Col lg={8} className={styles.detailsColumn}>
            <Card className={styles.detailsCard}>
              <CardHeader className={styles.cardHeader}>
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
                          Save Job
                        </Dropdown.Item>
                        <Dropdown.Item className="danger" onClick={() => {}}>
                          Report JOb
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
                        <h2 className={styles.agencyName}>
                          Continental Holdings.inc
                        </h2>
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
              <CardBody className={styles.detailsCardBody}>
                <Tabs variant="pills" defaultActiveKey="home" id="jobDetailTab">
                  <Tab eventKey="home" title="Positions">
                    <JobPositions positions={positions} />
                  </Tab>
                  <Tab eventKey="profile" title="About Recruiter">
                    Tab content for Profile
                  </Tab>
                  <Tab eventKey="contact" title="More Info">
                    Tab content for Contact
                  </Tab>
                </Tabs>
                {COUNTRIES[location as "bh"] && (
                  <CurrencyConverter
                    currency={COUNTRIES[location as "bh"].currency}
                    country={COUNTRIES[location as "bh"].label}

                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
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
