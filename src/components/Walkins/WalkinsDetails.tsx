import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./WalkinsDetail.module.scss";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
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
import Spinner from "react-bootstrap/Spinner";
import { LuExpand } from "react-icons/lu";
import {
  getJobDetails,
  saveJob,
  removeSavedJob,
  getAgencyDetails,
  reportJob,
} from "@/apis/jobs";
import { truncateText } from "@/helpers/truncate";
import { JobPositions } from "./WalkinsPositions";
import { CurrencyConverter } from "./Walkins CurrencyConverter";
import { useAuthUserStore } from "@/stores/useAuthUserStore";
import { isTokenValid } from "@/helpers/jwt";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { INDIAN_STATES } from "@/helpers/states";
type PostedWalkinsProps = {
  jobId: string;
};
type AgencyDetailsType = {
  address: string;
  name: string;
  email: string;
  phone: string;
  state: string;
};

const AgencyDetails = ({ agencyDetailsId }: { agencyDetailsId: string }) => {
  const t = useTranslations("Details");
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["agencyDetails", agencyDetailsId],
    queryFn: () => {
      if (agencyDetailsId) {
        return getAgencyDetails(agencyDetailsId);
      }
      throw new Error("jobId is null or undefined");
    },
    enabled: !!agencyDetailsId,
  });

  if (isLoading || isFetching) {
    return <Loader text="Fetching agency details" />;
  }

  if (isError || !data) {
    return <NotFound text="Agency details are not present" />;
  }
  const agencyDetails = data?.agency;
  return (
    <div className={styles.recruiterDetails}>
      <table>
        <tr>
          <td>
            <h3 className={`d-none d-sm-block ${styles.infoData}`}>
              <span className={styles.label}>{t("hiring_organization")}</span>
            </h3>
          </td>
          <td>
            <h3 className={`d-none d-sm-block ${styles.infoData}`}>
              <span>{agencyDetails.name}</span>
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 className={`d-none d-sm-block ${styles.infoData}`}>
              <span className={styles.label}>{t('name')}</span>
            </h3>
          </td>
          <td>
            <h3 className={`d-none d-sm-block ${styles.infoData}`}>
              <span>{agencyDetails.name}</span>
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 className={`d-none d-sm-block ${styles.infoData}`}>
              <span className={styles.label}>{t('email')}</span>
            </h3>
          </td>
          <td>
            <h3 className={`d-none d-sm-block ${styles.infoData}`}>
              <span>{agencyDetails.email}</span>
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 className={`d-none d-sm-block ${styles.infoData}`}>
              <span className={styles.label}>{t('address')}</span>
            </h3>
          </td>
          <td>
            <h3 className={`d-none d-sm-block ${styles.infoData}`}>
              <span>{agencyDetails.address}</span>
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 className={`d-none d-sm-block ${styles.infoData}`}>
              <span className={styles.label}>{t('state')}</span>
            </h3>
          </td>
          <td>
            <h3 className={`d-none d-sm-block ${styles.infoData}`}>
              <span>
                {INDIAN_STATES.find(
                  (st) => st.state_code === agencyDetails.state
                )?.name || "N/A"}
              </span>
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 className={`d-none d-sm-block ${styles.infoData}`}>
              <span className={styles.label}>{t('city')}</span>
            </h3>
          </td>
          <td>
            <h3 className={`d-none d-sm-block ${styles.infoData}`}>
              <span>{agencyDetails.city}</span>
            </h3>
          </td>
        </tr>
      </table>
    </div>
  );
};

const WalkinsDetails: React.FC<PostedWalkinsProps> = ({ jobId }) => {
  const t = useTranslations("Details");
  const [agencyDetails, setAgencyDetails] = useState<any>(null);

  const [selectedPosition, setSelectedPosition] = useState<string[] | []>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { setOpenLogin } = useAuthUserStore();
  const isLoggedIn = isTokenValid();
  const router = useRouter();
  const queryClient = useQueryClient();
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
    isSaved,
  } = data?.job || {};

  const { isDesktop, isTab, isMobile } = useReponsiveStore();

  const handleSaveJob = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return true;
    }
    setIsSaving(true);
    try {
      await saveJob(jobId);
      await queryClient.invalidateQueries({
        queryKey: ["jobDetails", jobId],
        refetchType: "all",
      });
      toast.success(t('job_saved'));
    } catch (error) {
      console.error("Failed to save job:", error);
      toast.error(t('submit_error'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveSavedJob = async () => {
    setIsSaving(true);
    try {
      await removeSavedJob(jobId);
      await queryClient.invalidateQueries({
        queryKey: ["jobDetails", jobId],
        refetchType: "all",
      });
      toast.success(t('job_removed'));
    } catch (error) {
      console.error("Failed to remove saved job:", error);
      toast.error(t('remove_failed'));
    } finally {
      setIsSaving(false);
    }
  };

  const goBack = () => {
    router.back();
  };

  const handlePositionSelect = (positionId: string, checked: boolean) => {
    let selectedPos;
    if (checked) {
      selectedPos = [...selectedPosition, positionId];
    } else {
      selectedPos = selectedPosition.filter((x) => x !== positionId);
    }
    setSelectedPosition(selectedPos);
  };

  const handleReportJob = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return true;
    }
    const loading = toast.loading("Reporting the job posting")
    try {
      await reportJob(jobId);
      toast.dismiss(loading);
      toast.success(t('job_reported'));
    } catch (error) {
      toast.dismiss(loading);
      toast.error(t('job_report_failed'));
    }
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
              {!isDesktop && (
                <CardHeader className={styles.cardHeader}>
                  <div
                    className={`${styles.detailsCardHeader} ${styles.cardActionsHeader}`}
                  >
                    <h3 onClick={goBack} className={styles.backlink}>
                      <FaChevronLeft fontSize={16} color="#000" />
                      {t('posting_details')}


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
                            {t("save_job")}
                          </Dropdown.Item>
                          <Dropdown.Item className="danger" onClick={() => {}}>
                            {t("report_job")}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </CardHeader>
              )}

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
                {!isDesktop && (
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
                        <p className="d-none d-sm-block">
                        {t('approved_by_mofa_india')}
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
                )}
                <div className={styles.summaryDetailsSection}>
                  <h3 className={styles.infoData}>{t('posting_details')}</h3>
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
                              {t("read_more")}
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
                  <h3 className={`d-none d-sm-block ${styles.infoData}`}>
                    <span className={styles.label}>
                      {t("hiring_organization")}
                    </span>
                    <span>{agencyId.name}</span>
                  </h3>
                  <ul className={styles.benefits}>
  {amenities.map((amenity: string, index: number) => (
    <li key={index}>
      <Image
        src={FACILITIES_IMAGES[amenity as "Food" | "Transportation" | "Stay" | "Recruitment"]} 
        alt={amenity === "Food" ? t('food') : amenity} 
        width={16}
        height={16}
      />{" "}
      <span>{t(amenity.toLowerCase())}</span>
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
                      {t('valid_till')}{" "}
                      {DateTime.fromISO(expiry).toFormat("dd-MMM-yyyy")}
                    </span>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>
          <Col lg={8} className={styles.detailsColumn}>
            <Card className={styles.detailsCard}>
              {isDesktop && (
                <CardHeader className={styles.cardHeader}>
                  <div
                    className={`${styles.detailsCardHeader} ${styles.cardActionsHeader}`}
                  >
                    <h3 onClick={goBack} className={styles.backlink}>
                      <FaChevronLeft fontSize={16} color="#000" />
                      {t('job_posting_details')}
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
                          <Dropdown.Item className="danger" onClick={handleReportJob}>
                            {t("report_job")}
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
                        {t('approved_by_mofa_india')}

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
              )}

              <CardBody className={styles.detailsCardBody}>
                <div className={styles.tabContainer}>
                  <Tabs
                    variant="pills"
                    className={styles.navPills}
                    defaultActiveKey="home"
                    id="jobDetailTab"
                  >
                    <Tab eventKey="home" title={t("positions")}>
                      <JobPositions
                        positions={positions}
                        onPositionSelect={handlePositionSelect}
                      />
                    </Tab>
                    {!isMobile && (
                      <Tab eventKey="aboutRecruiters" title={t("about_recruiters")}>
                        <AgencyDetails agencyDetailsId={agencyId} />
                      </Tab>
                    )}
                    {!isMobile && (
                      <Tab eventKey="contact" title={("more_info")}>
                        <p className={styles.moreDetails}>
                        {t('more_info_description')}

                        </p>
                      </Tab>
                    )}
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
                  {showSuccess || applied ? (
                    <div className={styles.successMessage}>
                      <BsCheckCircleFill />{t('job_application_success')}

                    </div>
                  ) : (
                    <>
                      {isSaved ? (
                        <Button
                          className={styles.saveJobButton}
                          variant="secondary"
                          onClick={handleRemoveSavedJob}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <>
                              <Spinner animation="border" size="sm" />
                              <span className="ms-2"></span>
                            </>
                          ) : (
                            t("unsave_job")
                          )}
                        </Button>
                      ) : (
                        <Button
                          className={styles.saveJobButton}
                          variant="secondary"
                          onClick={handleSaveJob}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <>
                              <Spinner animation="border" size="sm" />
                              <span className="ms-2"></span>
                            </>
                          ) : (
                            t("save_job")
                          )}
                        </Button>
                      )}

                      <Button
                        className={styles.easyApplyButton}
                        onClick={openModal}
                        disabled={selectedPosition.length === 0}
                      >
                        {t("easy_apply")}
                      </Button>
                    </>
                  )}
                </div>
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

export default WalkinsDetails;
