"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import styles from "../common/styles/Details.module.scss";
import agencyStyles from "./AgencyDetails.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Dropdown,
  Row,
} from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { Loader, NotFound } from "../common/Feedbacks";
import { AgencyJobPostings } from "./AgencyJobPostings";
import { IMAGE_BASE_URL } from "@/helpers/constants";
import { INDIAN_STATES } from "@/helpers/states";
import { getAgencyDetails } from "@/apis/jobs";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { toggleNotifyForAgency  } from "@/apis/user";
import { reportagencyissue } from "@/apis/agency";
import toast from "react-hot-toast";
import { useAuthUserStore } from "@/stores/useAuthUserStore";
import { isTokenValid } from "@/helpers/jwt";

type PostedAgencyDetailsProps = {
  agencyId: string;
};

type TabType = "about" | "jobs";

const AgencySummary = ({ data }: { data: any }) => {
  const router = useRouter();
  const {
    regNo,
    name,
    address,
    phone,
    activeJobCount,
    profilePic,
    city,
    state,
    email,
  } = data?.agency || {};

  const goBack = () => {
    router.back();
  };

  const t = useTranslations("AgencyDetails");
  return (
    <Card className={`${styles.summaryCard} ${agencyStyles.summaryCard}`}>
      <CardHeader className={agencyStyles.summaryCardHeader}>
        <div className={styles.agencyDetails}>
          <Image
            src={`${
              profilePic ? `${IMAGE_BASE_URL}/${profilePic}` : "/no_image.jpg"
            }`}
            width={66}
            height={66}
            alt="agency-logo"
          />
          <div>
            <div className={styles.agencyNameContainer}>
              <h2 className={styles.agencyName}>{name}</h2>
              <Image
                src="/icons/verified.svg"
                width={13}
                height={13}
                alt="agency-logo"
              />
            </div>
            <p className={agencyStyles.regNo}>{regNo || "N/A"}</p>
          </div>
        </div>
        <h5 className={`${agencyStyles.approvedText} success`}>
          {t("approved_by_mea")}
        </h5>
      </CardHeader>
      <CardBody
        className={`${styles.summaryCardBody} ${agencyStyles.summaryCardBody}`}
      >
        <ul className={`${styles.jobInfoList} ${agencyStyles.agencyInfoList}`}>
          <li>
            <Image
              src={"/icons/suitcase.png"}
              width={24}
              height={20}
              alt="suitcase"
            />
            <span>
              {activeJobCount} {t("jobs_posted")}
            </span>
          </li>
        </ul>
        <div className={agencyStyles.addressSection}>
          <h3>{t("address")}</h3>
          <p>
            {address}, {city || ""},{" "}
            {INDIAN_STATES.find((x) => x.state_code === state)?.name ||
              state ||
              ""}
          </p>

          <iframe
            height="216"
            style={{ border: 0, width: "100%" }}
            loading="lazy"
            src="https://www.google.com/maps/place/Splitbit+Innovative+Solutions/@17.4449405,78.3856523,15z/data=!4m6!3m5!1s0x3bcb934575864743:0x4e49a96c37440063!8m2!3d17.4449405!4d78.3856523!16s%2Fg%2F11pw8r8w2c?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D"
          ></iframe>
        </div>
        <div className={agencyStyles.contactSection}>
          <h3>{t("contact")}</h3>
          <ul
            className={`${styles.jobInfoList} ${agencyStyles.agencyContactList}`}
          >
            <li>
              <Image
                src={"/icons/phone.png"}
                width={16}
                height={16}
                alt="phone"
              />
              <a href={`tel:${phone}`}>{phone}</a>
            </li>
            <li>
              <Image
                src={"/icons/mail.svg"}
                width={16}
                height={16}
                alt="mail"
              />
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};

const AgencyJobs = ({ data }: { data: any }) => {
  const { isDesktop } = useReponsiveStore();
  const t = useTranslations("AgencyDetails");
  const { authUser } = useAuthUserStore();
  const { _id, activeJobCount } = data?.agency || {};
  const [isInNotifyList,setIsInNotifyList] = useState(false);
  const isLoggedIn = isTokenValid();
  const { setOpenLogin } = useAuthUserStore();

 
 
  const enableNotify = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return true;
    }
    try {
      await toggleNotifyForAgency(_id,"notify");
      setIsInNotifyList(true);
      toast.success(t("notify_enabled"));
    } catch (e: any) {
      if (e.status === 400) {
        toast.success(t("notify_exist_error"));
      } else {
        toast.error(t("notify_error"));
      }
    }
  };

  const disableNotification = async () => {
    try {
      await toggleNotifyForAgency(_id,'unnotify');
      setIsInNotifyList(false);
      toast.success(t("notify_disabled"));
    } catch (e: any) {
      if (e.status === 400) {
        toast.success(t("notify_disabled_exist_error"));
      } else {
        toast.error(t("notify_disabled_error"));
      }
    }
  };

  const reportIssue = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true); 
      return;
    }
  
    try {
      await reportagencyissue(_id);
      toast.success(t("report_success"));
    } catch (error:any){
      toast.error(t("report_error"));
    }
  };

  useEffect(()=>{
   if(_id && authUser){
      setIsInNotifyList(authUser.notifyFor?.includes(_id))
   } 
  },[_id,authUser]);



  return (
    <Card className={`${styles.detailsCard} ${agencyStyles.detailsCard}`}>
      {isDesktop && (
        <CardHeader
          className={`${styles.detailsCardHeader} ${agencyStyles.detailsCardHeader}`}
        >
          <div className={agencyStyles.detailInfoHeader}>
            <h3>
              {t("jobs_posted")} ({activeJobCount})
            </h3>
          </div>
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
                {isInNotifyList ? (
                  <Dropdown.Item onClick={disableNotification}>
                    {t("not_notify")}
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={enableNotify}>
                    {t("notify")}
                  </Dropdown.Item>
                )}
               <Dropdown.Item onClick={reportIssue}>
                {t("report_issue")}
                  </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </div>
        </CardHeader>
      )}
      <CardBody className={agencyStyles.detailCardBody}>
        <AgencyJobPostings agencyId={_id} postedJobs={activeJobCount} />
      </CardBody>
    </Card>
  );
};

const AgencyDetailsMobile = ({ data }: { data: any }) => {
  const t = useTranslations("AgencyDetails");
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };
  const { authUser } = useAuthUserStore();
  const [isInNotifyList,setIsInNotifyList] = useState(false);
  const isLoggedIn = isTokenValid();
  const { _id, name } = data?.agency || {};
  const { setOpenLogin } = useAuthUserStore();
 

  const enableNotify = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return true;
    }
    try {
      await toggleNotifyForAgency(_id,'notify');
      setIsInNotifyList(true);
      toast.success(t("notify_enabled"));
    } catch (e: any) {
      if (e.status === 400) {
        toast.success(t("notify_exist_error"));
      } else {
        toast.error(t("notify_error"));
      }
    }
  };

  const disableNotification = async () => {
    try {
      await toggleNotifyForAgency(_id,'unnotify');
      setIsInNotifyList(false);
      toast.success(t("notify_disabled"));
    } catch (e: any) {
      if (e.status === 400) {
        toast.success(t("notify_disabled_exist_error"));
      } else {
        toast.error(t("notify_disabled_error"));
      }
    }
  };
 
  useEffect(()=>{
   if(_id && authUser){
      setIsInNotifyList(authUser?.notifyFor?.includes(_id))
   } 
  },[_id,authUser])
  
  return (
    <>
      <Card className={`${styles.summaryCard} ${agencyStyles.summaryCard}`}>
        <CardHeader
          className={`${styles.detailsCardHeader} ${agencyStyles.detailsCardHeader}`}
        >
          <div className={agencyStyles.detailInfoHeader}>
            <h3>{name}</h3>
          </div>
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
              {isInNotifyList ? (
                  <Dropdown.Item onClick={disableNotification}>
                    {t("not_notify")}
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={enableNotify}>
                    {t("notify")}
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={() => {}}>
                  {t("report_issue")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </CardHeader>

        <div className={`header-row ${agencyStyles.headerRow}`}>
          <div className={"tab-container"}>
            <button
              className={`tab-button ${activeTab === "about" ? "active" : ""}`}
              onClick={() => handleTabClick("about")}
            >
              {t("about")}
            </button>
            <button
              className={`tab-button ${activeTab === "jobs" ? "active" : ""}`}
              onClick={() => handleTabClick("jobs")}
            >
              {t("jobs")}
            </button>
          </div>
        </div>
        {
          {
            about: <AgencySummary data={data} />,
            jobs: <AgencyJobs data={data} />,
          }[activeTab]
        }
      </Card>
    </>
  );
};
const AgencyDetails: React.FC<PostedAgencyDetailsProps> = ({ agencyId }) => {
  const t = useTranslations("AgencyDetails");
  const { isDesktop } = useReponsiveStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["agencyDetails", agencyId],
    queryFn: () => {
      if (agencyId) {
        return getAgencyDetails(agencyId);
      }
      throw new Error("agencyId is null or undefined");
    },
    enabled: !!agencyId,
  });

  if (isLoading) {
    return (
      <main className="main-section">
        <Loader text={t("loading_agency")} />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="main-section">
        <NotFound text={t("not_present")} />
      </main>
    );
  }
  if (isError) {
    return (
      <main className="main-section">
        <NotFound text={t("agency_details_error")} />
      </main>
    );
  }

  return (
    <main className="main-section">
      {!isDesktop ? (
        <AgencyDetailsMobile data={data} />
      ) : (
        <Container fluid>
          <Row>
            <Col lg={4}>
              <AgencySummary data={data} />
            </Col>
            <Col lg={8}>
              <AgencyJobs data={data} />
            </Col>
          </Row>{" "}
        </Container>
      )}
    </main>
  );
};

export default AgencyDetails;
