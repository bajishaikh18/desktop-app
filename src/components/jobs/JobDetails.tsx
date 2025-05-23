import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "../common/styles/Details.module.scss";
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
import { JobPositions } from "./JobPositions";
import { CurrencyConverter } from "./CurrencyConverter";
import JobApply from "./JobApply";
import { useAuthUserStore } from "@/stores/useAuthUserStore";
import { isTokenValid } from "@/helpers/jwt";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { INDIAN_STATES } from "@/helpers/states";
import { getJobApplication } from "@/apis/applications";

type PostedJobDetailsProps = {
  jobId: string;
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
    return <Loader text={t("fetching_agency_details")} />;
  }

  if (isError || !data) {
    return <NotFound text={t("agency_details_missing")} />;
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
              <span className={styles.label}>{t("name")}</span>
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
              <span className={styles.label}>{t("email")}</span>
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
              <span className={styles.label}>{t("address")}</span>
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
              <span className={styles.label}>{t("state")}</span>
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
              <span className={styles.label}>{t("city")}</span>
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

const JobDetails: React.FC<PostedJobDetailsProps> = ({ jobId }) => {
  const t = useTranslations("Details");
  

  const [selectedPosition, setSelectedPosition] = useState<string[] | []>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [, setShowSuccess] = useState(false);
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
  
    agencyId,
    createdAt,
    expiry,
  
    imageUrl,
    location,
    positions,
   
    applied,
    description,
    amenities,
    isSaved,
  } = data?.job || {};

  const {
    data: application,
    isLoading: applicationLoading,
   
  } = useQuery({
    queryKey: ["jobApplications", jobId, applied],
    queryFn: () => {
      if (applied) {
        return getJobApplication(jobId);
      }
      return {app:{}}
    },
    enabled: !!jobId,
  });
  const { positions: appliedPositions, _id: applicationId } =
    application?.app || {};

  const { isDesktop,  isMobile } = useReponsiveStore();

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
      toast.success(t("job_saved"));
    } catch {
      console.error("Failed to save job:");
      toast.error(t("submit_error"));
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
      toast.success(t("job_removed"));
    } catch  {
      console.error("Failed to remove saved job:");
      toast.error(t("remove_failed"));
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
    const loading = toast.loading(t("report_posting"));
    try {
      await reportJob(jobId);
      toast.dismiss(loading);
      toast.success(t("job_reported"));
    } catch {
      toast.dismiss(loading);
      toast.error(t("job_report_failed"));
    }
  };

  const openModal = () => {
    if (selectedPosition && isLoggedIn) {
      setShowApplyModal(true);
    } else {
      setOpenLogin(true);
    }
  };

  const onSuccess = async () => {
    setShowSuccess(true);
    setShowApplyModal(false);
    await queryClient.invalidateQueries({
      queryKey: ["jobDetails", jobId],
      refetchType: "all",
    });
    await queryClient.invalidateQueries({
     queryKey: ["jobApplications", jobId, applied],
     refetchType: "all",
    })
  };

  const allowReapply = positions?.every((pos: any) =>
    appliedPositions?.includes(pos._id)
  );

  if (isLoading) {
    return (
      <main className="main-section">
        <Loader text={t("loading_job_details")} />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="main-section">
        <NotFound text={t("job_details_not_present")} />
      </main>
    );
  }
  if (isError) {
    return (
      <main className="main-section">
        <NotFound text={t("job_details_error")} />
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
                      {t("posting_details")}
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
                        src={`${
                          agencyId?.profilePic
                            ? `${IMAGE_BASE_URL}/${agencyId?.profilePic}`
                            : "/no_image.jpg"
                        }`}
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
                          {t("approved_by_mofa_india")}
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
                  <h3 className={styles.infoData}>{t("job_details")}</h3>
                  <p>
                    {description ? (
                      <>
                        {showFullText ? (
                          <>
                            {description}
                            <a
                            href="javascript:;"
                            onClick={() => setShowFullText(false)}
                            >
                              {t("hide")}
                            </a>
                          </>
                        ) : (
                          <>
                            {truncateText(description, 100)}
                            {
                              description.length>100 && <a
                              href="javascript:;"
                                onClick={() => setShowFullText(true)}
                              >
                                {t("read_more")}
                              </a>
                            }
                           
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
                          src={
                            FACILITIES_IMAGES[
                              amenity as
                                | "Food"
                                | "Transportation"
                                | "Stay"
                                | "Recruitment"
                            ]
                          }
                          alt={t(amenity.toLowerCase())}
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
                      {t("valid_till")}{" "}
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
                      {t("job_details")}
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
                          <Dropdown.Item
                            className="danger"
                            onClick={handleReportJob}
                          >
                            {t("report_job")}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className={styles.detailsCardHeader}>
                    <div className={styles.agencyDetails}>
                      <Image
                        src={`${
                          agencyId?.profilePic
                            ? `${IMAGE_BASE_URL}/${agencyId?.profilePic}`
                            : "/no_image.jpg"
                        }`}
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
                        <p>{t("approved_by_mofa_india")}</p>
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
                      {applicationLoading ? (
                        <Loader text={t("validating_job_positions")} />
                      ) : (
                        <JobPositions
                          positions={positions}
                          appliedPositions={appliedPositions}
                          onPositionSelect={handlePositionSelect}
                        />
                      )}
                    </Tab>
                    {!isMobile && (
                      <Tab
                        eventKey="aboutRecruiters"
                        title={t("about_recruiters")}
                      >
                        <AgencyDetails agencyDetailsId={agencyId._id} />
                      </Tab>
                    )}
                    {!isMobile && (
                      <Tab eventKey="contact" title={t("more_info")}>
                        <p className={styles.moreDetails}>
                          {t("more_info_description")}
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
                  {allowReapply ? (
                    <div className={styles.successMessage}>
                      <BsCheckCircleFill />
                      {t("job_application_success")}
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

      {showApplyModal && (
        <JobApply
          id={jobId}
          show={showApplyModal}
          onHide={() => {
            setShowApplyModal(false);
          }}
          applicationId={applicationId}
          appliedPositions={appliedPositions || []}
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
