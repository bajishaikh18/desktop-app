"use client";
import React from "react";
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
  Row,
} from "react-bootstrap";
import { Loader, NotFound } from "../common/Feedbacks";
import { IMAGE_BASE_URL } from "@/helpers/constants";
import { INDIAN_STATES } from "@/helpers/states";
import { getTradeDetails } from "@/apis/trade";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { MapView } from "../common/MapView";

type PostedTradeDetailsProps = {
  tradeId: string;
};


const TradeSummary = ({ data }: { data: any }) => {
  const {
    name,
    latitude,
    longitude,
    address,
    profilePic,
    city,
    state,
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


const TradeDetailsMobile = ({ data }: { data: any }) => {
  const {  name } = data?.agency || {};
  return (
    <>
      <Card className={`${styles.detailsCard} ${tradestyles.detailsCard}`}>
        <CardBody className={tradestyles.detailsCardBody}>
          <h2>{name}</h2>
          <div>
              <TradeSummary data={data} />
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
  