import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "../common/styles/Details.module.scss";
import walkinsDetailsStyles from "./WalkinsDetails.module.scss";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { atcb_action } from "add-to-calendar-button-react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Dropdown,
  Row,
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
  getWalkinsDetails,
  removeSavedInterview,
  reportWalkins,
  saveInterview,
} from "@/apis/walkins";
import { truncateText } from "@/helpers/truncate";
//import  Positions  from "./WalkinsPositions";
import { useAuthUserStore } from "@/stores/useAuthUserStore";
import { isTokenValid } from "@/helpers/jwt";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { MapView } from "../common/MapView";

type PostedWalkinsDetailsProps = {
  walkinId: string;
};

const WalkinsDetails: React.FC<PostedWalkinsDetailsProps> = ({ walkinId }) => {
  const [showMap] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const [showSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [interestedClicked, setInterestedClicked] = useState(false);
  const { setOpenLogin } = useAuthUserStore();
  const isLoggedIn = isTokenValid();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["walkinDetails", walkinId],
    queryFn: () => {
      if (walkinId) {
        return getWalkinsDetails(walkinId);
      }
      throw new Error("walkinId is null or undefined");
    },
    enabled: !!walkinId,
  });

  const {
    agencyId,
    createdAt,
    expiry,

    imageUrl,
    location,
    interviewDate,

    contactNumbers,
    email,

    interviewAddress,
    latitude,
    longitude,
    interviewLocation,
    applied,
    description,
    amenities,
    isSaved,
  } = data?.interview || {};

  const { isDesktop } = useReponsiveStore();

  const addToCalendar = useCallback(
    (e: any) => {
      const date = DateTime.fromISO(interviewDate, { zone: "Asia/Kolkata" });
      const config = {
        name: `Walkin for ${agencyId?.name}`,
        description: `Location : ${interviewAddress} ,${interviewLocation}`,
        location: `${latitude} ${longitude}`,
        startDate: date.toFormat("yyyy-MM-dd"),
        startTime: date.toFormat("HH:mm"),
        endTime: "23:59",
        options: ["Google" as "Google"],
      };
      atcb_action(config, e.target);
    },
    [interviewDate, latitude, longitude, agencyId, description]
  );

  const handleSaveInterview = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return true;
    }
    setIsSaving(true);
    try {
      await saveInterview(walkinId);
      await queryClient.invalidateQueries({
        queryKey: ["walkinDetails", walkinId],
        refetchType: "all",
      });
      toast.success(t("interview_saved"));
    } catch {
      console.error("Failed to save Interview:");
      toast.error(t("submit_error"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveSavedInterview = async () => {
    setIsSaving(true);
    try {
      await removeSavedInterview(walkinId);
      await queryClient.invalidateQueries({
        queryKey: ["walkinDetails", walkinId],
        refetchType: "all",
      });
      toast.success(t("interview_removed"));
    } catch {
      console.error("Failed to remove saved interview:");
      toast.error(t("remove_failed"));
    } finally {
      setIsSaving(false);
    }
  };

  const goBack = () => {
    router.back();
  };

  const handleReportJob = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return true;
    }
    const loading = toast.loading(t("report_posting"));
    try {
      await reportWalkins(walkinId);
      toast.dismiss(loading);
      toast.success(t("walkin_reported"));
    } catch {
      toast.dismiss(loading);
      toast.error(t("walkin_report_failed"));
    }
  };

  const openMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${
      latitude && longitude ? `${longitude},${longitude}` : interviewAddress
    }`;
    window.open(url);
  };

  const t = useTranslations("WalkinDetails");
  if (isLoading) {
    return (
      <main className="main-section">
        <Loader text={t("loading_walkin_details")} />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="main-section">
        <NotFound text={t("walkin_details_not_present")} />
      </main>
    );
  }
  if (isError) {
    return (
      <main className="main-section">
        <NotFound text={t("walkin_details_error")} />
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
                          <Dropdown.Item onClick={addToCalendar}>
                            {t("add_to_calendar")}
                          </Dropdown.Item>
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
                          <h2 className={styles.agencyName}>
                            {agencyId?.name}
                          </h2>
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
                    {/* Smaller Screens */}
                    <div className={walkinsDetailsStyles.interestedRow}>
                      <div className={styles.location}>
                        <Image
                          src={"/icons/location.svg"}
                          width={18}
                          height={18}
                          alt="location"
                        />
                        {COUNTRIES[location as "bh"]?.label ||
                          location ||
                          "N/A"}
                      </div>
                      <div className={walkinsDetailsStyles.interestedContainer}>
                        <div className={walkinsDetailsStyles.interestedCount}>
                          000
                        </div>
                        <button
                          className={
                            walkinsDetailsStyles.interestedButton +
                            (interestedClicked
                              ? " " + walkinsDetailsStyles.active
                              : "")
                          }
                          onClick={() => setInterestedClicked((v) => !v)}
                        >
                          <div
                            className={
                              walkinsDetailsStyles.interestedText +
                              (interestedClicked
                                ? " " + walkinsDetailsStyles.activeText
                                : "")
                            }
                          >
                            Interested
                          </div>
                          <Image
                            src={
                              interestedClicked
                                ? "/Like-filled.svg"
                                : "/Like.svg"
                            }
                            alt="Like"
                            width={14}
                            height={14}
                            className={
                              interestedClicked
                                ? walkinsDetailsStyles.activeIcon
                                : ""
                            }
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div className={styles.summaryDetailsSection}>
                  <h3 className={styles.infoData}>{t("walkin_details")}</h3>
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
                            {description.length > 100 && (
                              <a
                                href="javascript:;"
                                onClick={() => setShowFullText(true)}
                              >
                                {t("read_more")}
                              </a>
                            )}
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
                      {t("walkin_details")}
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
                          <Dropdown.Item onClick={addToCalendar}>
                            <span className="calendarTextButton">
                              {t("add_to_calendar")}
                            </span>
                          </Dropdown.Item>
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        gap: "2rem",
                      }}
                    >
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
                            <h2 className={styles.agencyName}>
                              {agencyId.name}
                            </h2>
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
                      <div className={walkinsDetailsStyles.interestedContainer}>
                        <div className={walkinsDetailsStyles.interestedCount}>
                          425
                        </div>
                        <button
                          className={
                            walkinsDetailsStyles.interestedButton +
                            (interestedClicked
                              ? " " + walkinsDetailsStyles.active
                              : "")
                          }
                          onClick={() => setInterestedClicked((v) => !v)}
                        >
                          <div
                            className={
                              walkinsDetailsStyles.interestedText +
                              (interestedClicked
                                ? " " + walkinsDetailsStyles.activeText
                                : "")
                            }
                          >
                            Interested
                          </div>
                          <Image
                            src={
                              interestedClicked
                                ? "/Like-filled.svg"
                                : "/Like.svg"
                            }
                            alt="Like"
                            width={14}
                            height={14}
                            className={
                              interestedClicked
                                ? walkinsDetailsStyles.activeIcon
                                : ""
                            }
                          />
                        </button>
                      </div>
                    </div>
                    <div
                      className={styles.location}
                      style={{ marginLeft: "1rem" }}
                    >
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

              <CardBody
                className={`${styles.detailsCardBody} ${styles.walkinDetailsCardBody}`}
              >
                <Row>
                  <Col md={6}>
                    <div className={styles.interviewDetails}>
                      <h3>{t("interview")}</h3>
                      <div className={styles.detailItemsRow}>
                        <div className={styles.detailItem}>
                          <Image
                            width={18}
                            height={18}
                            src={"/icons/location.svg"}
                            alt="location"
                          />
                          <h6>{interviewLocation}</h6>
                        </div>
                        <div className={styles.detailItem}>
                          <Image
                            width={16}
                            height={16}
                            src={"/icons/calendar.svg"}
                            alt="location"
                          />
                          <h6>
                            {DateTime.fromISO(interviewDate).toFormat(
                              "dd MMM yyyy hh:mm a"
                            )}
                          </h6>
                        </div>
                      </div>
                      <div className={styles.detailItemsRow}>
                        <div className={styles.detailItem}>
                          <Image
                            width={16}
                            height={16}
                            src={"/icons/clock.svg"}
                            alt="location"
                          />
                          <h6>{DateTime.fromISO(createdAt).toRelative()}</h6>
                        </div>
                        <div className={styles.detailItem}>
                          <Image
                            width={17}
                            height={17}
                            src={"/icons/expiry-icon.svg"}
                            alt="location"
                          />
                          <h6>
                            {t("valid_till")}{" "}
                            {DateTime.fromISO(expiry).toFormat("dd-Mmm-yyyy")}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className={styles.interviewDetails}>
                      <h3>{t("address")}</h3>
                      <div className={styles.detailItemsRow}>
                        <h6>{interviewAddress}</h6>
                      </div>
                    </div>
                    <div className={styles.interviewDetails}>
                      <h3>{t("contact")}</h3>
                      <div className={styles.detailItemsRow}>
                        <div className={styles.detailItem}>
                          <Image
                            width={16}
                            height={16}
                            src={"/icons/phone.png"}
                            alt="location"
                          />
                          {contactNumbers.map((num: string, i: number) => {
                            return (
                              <>
                                {i !== 0 && ","}
                                <h6>
                                  <Link href={`tel:${num}`}>{num}</Link>
                                </h6>{" "}
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className={styles.detailItemsRow}>
                        <div className={styles.detailItem}>
                          <Image
                            width={16}
                            height={16}
                            src={"/icons/mail.svg"}
                            alt="location"
                          />
                          <h6>
                            <Link href={`mailto:${email}`}>{email}</Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    {interviewAddress && (
                      <MapView
                        address={interviewAddress}
                        latitude={latitude}
                        longitude={longitude}
                      />
                    )}
                  </Col>
                </Row>

                <div className={styles.jobActions}>
                  {showSuccess || applied ? (
                    <div className={styles.successMessage}>
                      <BsCheckCircleFill />
                      {t("walkin_application_success")}
                    </div>
                  ) : (
                    <>
                      {isSaved ? (
                        <Button
                          className={styles.saveJobButton}
                          variant="secondary"
                          onClick={handleRemoveSavedInterview}
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
                          onClick={handleSaveInterview}
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
                        onClick={openMaps}
                      >
                        {showMap ? t("hide_map") : t("view_direction")}
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
