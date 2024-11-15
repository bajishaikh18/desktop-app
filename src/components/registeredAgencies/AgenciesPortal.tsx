import React from "react";
import Image from "next/image";
import { Card, Row, Col, Container } from "react-bootstrap";
import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import styles from "./Agencies.module.scss";
import { getAgencies } from "@/apis/agency";
import { Loader, NotFound } from "../common/Feedbacks";
import { IMAGE_BASE_URL } from "@/helpers/constants";
import { useTranslations } from "next-intl";
import InfiniteScroll from 'react-infinite-scroll-component';

interface Agency {
  profilePic: string;
  name: string;
  regNo: string;
  postedJobs: number;
  validity: string;
  _id: string;
}

interface AgencyPortalProps {
  selectedCities: string[];
  searchText: string;
}

const fetchSize = 100;

const AgencyPortal: React.FC<AgencyPortalProps> = ({ selectedCities,searchText }) => {
  const t = useTranslations("AgencyPortal");
  const router = useRouter();
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isError:error,
  } = useInfiniteQuery<{agencies:Agency[],totalAgencyCount:number}>({
    queryKey: ["agencies", selectedCities, searchText],
    queryFn: async ({ pageParam = 1 }) =>{
      return getAgencies({
        page: pageParam as number,
        fetchSize: fetchSize,
        filters: { cities: selectedCities.join(','), name:searchText },
      });
    }
     ,
    initialPageParam: 1,
    getNextPageParam: (_lastGroup, groups) => groups.length+1,
    placeholderData: keepPreviousData,
  });

  const agencies = React.useMemo(
    () => data?.pages?.flatMap((page: any) => page?.agencies) ?? [],
    [data]
  );

  const total = data?.pages[0].totalAgencyCount || 0;

  if (isLoading || (isFetching && !isFetchingNextPage)) {
    return <Loader text={t("fetching_agencies")} />;
  }

  if (error) {
    return <NotFound text={t("error_agencies")} />;
  } 
  return (

    <InfiniteScroll dataLength={agencies.length} next={fetchNextPage}
 hasMore={agencies.length < total}  loader={ <Loader text={t("fetching_agencies")} />}
    >
    <Container className={styles.container}>

      {agencies && agencies.length > 0 ? (
        <Card className={`${styles.mainCard} shadow-sm bg-white rounded`}>
          {agencies.map((agency: Agency, index: number) => (
            <Card.Body
              key={agency._id}
              className={`${styles.agencySection} ${
                index < agencies.length - 1 ? "border-bottom" : ""
              }`}
            >
              <Row className={`align-items-center ${styles.agencyRow}`}>
                <Col xs={12} md={8} lg={6} className="d-flex align-items-center">
                  <Image
                    src={
                      agency.profilePic
                        ? `${IMAGE_BASE_URL}/${agency.profilePic}`
                        : "/no_image.jpg"
                    }
                    alt={agency.name}
                    width={64}
                    height={48}
                    className={`${styles.logo} rounded-circle`}
                  />
                  <div>
                    <h3 className={`${styles.companyName} h5`}>
                      {agency.name}
                      <Image
                        src="/check-verified-02.png"
                        alt="Verified"
                        width={24}
                        height={24}
                        className={`${styles.verifiedIcon} ms-2`}
                      />
                    </h3>
                    <p className={`${styles.regNo} text-muted small mb-0`}>
                      {t("reg_no")}: {agency.regNo}
                    </p>
                  </div>
                </Col>
                <Col
                  xs={12}
                  md={2} lg={2}
                  className={`d-flex align-items-center justify-content-start ${styles.agencyStats}`}
                >
                  <Image
                    src="/posted.png"
                    alt="Jobs Posted"
                    width={16}
                    height={14}
                    className={`${styles.jobsPostedIcon}`}
                  />
                  <p className={`${styles.jobsPosted} mb-0`}>
                    {agency.postedJobs} {t("jobs_posted")}
                  </p>
                </Col>
                {/* <Col xs={12} md={2} className="d-flex align-items-center justify-content-start">
                  <Image
                    src="/alarm-clock-check.png"
                    alt="Valid Till"
                    width={20}
                    height={18}
                    className={`${styles.alarmIcon} me-2`}
                  />
                  <p className={`${styles.validity} mb-0`}>
                 {t('validity')}
                  </p>
                </Col> */}
                <Col
                  xs={12}
                  md={2}
                  className={`d-flex text-end align-items-center justify-sm-content-end justify-content-start ${styles.agencyStats}`}
                >
                  <button
                    className={styles.viewJobsButton}
                    onClick={() => router.push(`/agency/${agency._id}`)}
                  >
                    {t("view_job")}
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

export default AgencyPortal;
