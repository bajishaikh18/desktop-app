"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import styles from "../common/styles/Details.module.scss";
import tradestyles from './TradeDetails.module.scss';  
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
import { IMAGE_BASE_URL } from "@/helpers/constants";
import { INDIAN_STATES } from "@/helpers/states";
import { getTradeDetails } from "@/apis/trade";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { toggleNotifyForAgency } from "@/apis/user";
import { reportagencyissue } from "@/apis/agency";
import toast from "react-hot-toast";
import { useAuthUserStore } from "@/stores/useAuthUserStore";
import { isTokenValid } from "@/helpers/jwt";
import { MapView } from "../common/MapView";
import { TradeJobPostings } from "./TradeJobPostings";

type PostedTradeDetailsProps = {
  tradeId: string;
};

type TabType = "about" | "jobs";

const TradeSummary = ({ data }: { data: any }) => {
  const router = useRouter();
  const {
    tradeId,
    name,
    latitude,
    longitude,
    address,
     phone,
    activeJobCount,
    profilePic,
    city,
    state,
    email,
  } = data?.trade || {};

  const t = useTranslations("TradeDetails");
  return (
    <Card className={`${styles.summaryCard} ${tradestyles.summaryCard}`}>
      <CardHeader className={tradestyles.summaryCardHeader}>
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
          </div>
        </div>
        <h5 className={`${tradestyles.approvedText} success`}>
          {t("approved_by_mea")}
        </h5>
      </CardHeader>
      <CardBody
        className={`${styles.summaryCardBody} ${tradestyles.summaryCardBody}`}
      >
        <ul className={`${styles.jobInfoList} ${tradestyles.agencyInfoList}`}>
          <li>
            <Image
              src={"/icons/location.svg"}
              width={24}
              height={20}
              alt="suitcase"
            />
            <span>
              {t("city")} : {city || ""}
            </span>
          </li>
          <li>
            <Image
              src={"/icons/location.svg"}
              width={24}
              height={20}
              alt="suitcase"
            />
            <span>
              {t("state")} : {INDIAN_STATES.find((x) => x.state_code === state)?.name ||
              state ||
              "" || ""}
            </span>
          </li>
        </ul>
        <div className={tradestyles.addressSection}>
          <h3>{t("address")}</h3>
          <p>
            {address}, 
            
          </p>
          {address && (
            <MapView address={address} latitude={latitude} longitude={longitude} />
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const TradeJobs = ({ data }: { data: any }) => {
  const { isDesktop } = useReponsiveStore();
  const t = useTranslations("TradeDetails");
  const { authUser } = useAuthUserStore();
  const { _id, activeJobCount } = data?.trade || {};
  const [isInNotifyList, setIsInNotifyList] = useState(false);
  const isLoggedIn = isTokenValid();
  const { setOpenLogin } = useAuthUserStore();

  const enableNotify = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return true;
    }
    try {
      await toggleNotifyForAgency(_id, "notify");
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
      await toggleNotifyForAgency(_id, 'unnotify');
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
    } catch {
      toast.error(t("report_error"));
    }
  };

  useEffect(() => {
    if (_id && authUser) {
      setIsInNotifyList(authUser.notifyFor?.includes(_id));
    }
  }, [_id, authUser]);

  return (
    <Card className={`${styles.detailsCard} ${tradestyles.detailsCard}`}>
      {isDesktop && (
        <CardHeader
          className={`${styles.detailsCardHeader} ${tradestyles.detailsCardHeader}`}
        >
          <div className={tradestyles.detailInfoHeader}>
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
      <CardBody className={tradestyles.detailCardBody}>
      </CardBody>
    </Card>
  );
};

const TradeDetailsMobile = ({ data }: { data: any }) => {
  const t = useTranslations("TradeDetails");
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };
  const { authUser } = useAuthUserStore();
  const [isInNotifyList, setIsInNotifyList] = useState(false);
  const isLoggedIn = isTokenValid();
  const { _id, name } = data?.agency || {};
  const { setOpenLogin } = useAuthUserStore();

  const enableNotify = async () => {
    if (!isLoggedIn) {
      setOpenLogin(true);
      return true;
    }
    try {
      await toggleNotifyForAgency(_id, 'notify');
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
      await toggleNotifyForAgency(_id, 'unnotify');
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

  useEffect(() => {
    if (_id && authUser) {
      setIsInNotifyList(authUser?.notifyFor?.includes(_id));
    }
  }, [_id, authUser]);

  return (
    <>
      <Card className={`${styles.detailsCard} ${tradestyles.detailsCard}`}>
        <CardBody className={tradestyles.detailsCardBody}>
          <h2>{name}</h2>
          <div>
            {activeTab === "about" && (
              <TradeSummary data={data} />
            )}
            {activeTab === "jobs" && (
              <TradeJobs data={data} />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

const TradeDetails: React.FC<PostedTradeDetailsProps> = ({ tradeId }) => {
    const t = useTranslations("TradeDetails");
    const { isDesktop } = useReponsiveStore();
  
    const { data, isLoading, isError } = useQuery({
      queryKey: ["tradeDetails", tradeId],
      queryFn: () => {
        if (tradeId) {
          return getTradeDetails(tradeId);
        }
        throw new Error("agencyId is null or undefined");
      },
      enabled: !!tradeId,
    });
  
    if (isLoading) {
      return (
        <main className="main-section">
          <Loader text={t("loading_trade")} />
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
          <NotFound text={t("trade_details_error")} />
        </main>
      );
    }
  
    return (
      <main className="main-section">
        {!isDesktop ? (
          <TradeDetailsMobile data={data} />
        ) : (
          <Container fluid>
            <Row>
              <Col lg={12}>
                <TradeSummary data={data} />
              </Col>
            </Row>{" "}
          </Container>
        )}
      </main>
    );
  };
  
  export default TradeDetails;
  