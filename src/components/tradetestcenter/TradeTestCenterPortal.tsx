import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { Loader, NotFound } from "../common/Feedbacks";
import styles from "./TradeTestCenters.module.scss";
import { gettrades } from "@/apis/trade";
import { useRouter } from "nextjs-toploader/app";
import { useTranslations } from "next-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { INDIAN_STATES } from "@/helpers/states";
interface TradeTestCenter {
  _id: string;
  tradeId: number;
  name: string;
  state: string;
  city: string;
  address: string;
  status: string;
}

interface TradeTestCenterPortalProps {
  selectedCities: string[];
  searchText: string;
}

const fetchSize = 100;

const TradeTestCenterPortal: React.FC<TradeTestCenterPortalProps> = ({
 
  selectedCities,
  
  searchText,
}) => {
   const router = useRouter();
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isError: error,
  } = useInfiniteQuery<{ trades: TradeTestCenter[]; totaltradeCount: number }>(
    {
      queryKey: ["tradeTestCenters", selectedCities, searchText],
      queryFn: async ({ pageParam = 1 }) => {
        return gettrades({
          page: pageParam as number,
          fetchSize: fetchSize,
          filters: { cities: selectedCities.join(","), name: searchText },
        });
      },
      initialPageParam: 1,
      getNextPageParam: (_lastGroup, groups) => groups.length + 1,
      placeholderData: keepPreviousData,
    }
  );
  const t = useTranslations("TradePortal");
  const trades = React.useMemo(
    () => data?.pages?.flatMap((page) => page?.trades) ?? [],
    [data]
  );

  const total = data?.pages[0].totaltradeCount || 0;

  if (isLoading || (isFetching && !isFetchingNextPage)) {
    return <Loader text={t("fetching_trades")} />;
  }

  if (error) {
    return <NotFound text={t("error_trades")} />;
  }

  return (
    <InfiniteScroll
      dataLength={trades.length}
      next={fetchNextPage}
      hasMore={trades.length < total}
      loader={ <Loader text={t("fetching_details")} />}
    >
    <Container className={styles.container}>
  {trades && trades.length > 0 ? (
    <Card className={`${styles.mainCard} shadow-sm bg-white rounded`}>
      {trades.map((trade: TradeTestCenter, index: number) => (
        <Card.Body
          key={trade._id}
          className={`${styles.tradeSection} ${
            index < trades.length - 1 ? "border-bottom" : ""
          }`}
        >
          <Row className={`align-items-center ${styles.tradeRow}`}>
            <Col xs={12} md={8} lg={6} className="d-flex align-items-center">
              <div>
                <h3 className={`${styles.companyName} h5 d-inline-block me-2`}>
                  {trade.name}
                </h3>
                <span className={`${styles.regNo} text-muted small`}>
                  {trade.address}
                </span>
              </div>
            </Col>
            <Col
              xs={12}
              md={2}
              lg={2}
              className={`d-flex align-items-center justify-content-start ${styles.tradeStats}`}
            >
                <p className={`${styles.testsPosted} mb-0`}>
                {INDIAN_STATES.find((x) => x.state_code === trade.state)?.name ||
                  trade.state ||
                  ""}
              </p>
            </Col>
            <Col xs={12} md={2} className="d-flex align-items-center justify-content-start">
              <p className={styles.city}>
                {trade.city}
              </p>
            </Col>
            <Col xs={12} md={2} className="d-flex align-items-center justify-sm-content-end justify-content-start">
              <button
                className={styles.viewJobsButton}
                onClick={() => router.push(`/trade/${trade._id}`)}
              >
                {t('view_trades')}
              </button>
            </Col>
          </Row>

          
        </Card.Body>
      ))}
    </Card>
  ) : (
    <NotFound text={t("not_found")} />
  )}
</Container>

    </InfiniteScroll>
  );
};

export default TradeTestCenterPortal;
