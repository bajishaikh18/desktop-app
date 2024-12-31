"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Row, Col, Card, Container } from "react-bootstrap";
import styles from "../common/styles/Card.module.scss";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getJobs } from "@/apis/jobs";
import { Loader, NotFound } from "../common/Feedbacks";
import { FACILITIES_IMAGES, IMAGE_BASE_URL } from "@/helpers/constants";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
// @ts-ignore
import { useRouter } from "nextjs-toploader/app";
import InfiniteScroll from "react-infinite-scroll-component";

const fetchSize = 50;
const JobPortal: React.FC<{
  selectedCountry: string;
  field: string;
  filter: string;
}> = ({ selectedCountry, field, filter }) => {
  const router = useRouter();
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    
  } = useInfiniteQuery<any>({
    queryKey: ["joblist", selectedCountry, field, filter],
    queryFn: ({ pageParam = 1 }) => {
      const filtersPlaceholder = {
        location: selectedCountry,
        [field as "jobTitle"]: filter,
      };

      const filters = Object.entries(filtersPlaceholder).reduce(
        (obj, [key, val]) => {
          if (key && val) {
            obj[key as "jobTitle"] = val;
          }
          return obj;
        },
        {} as { jobTitle?: string; location?: string }
      );

      return getJobs({
        page: pageParam as number,
        fetchSize: fetchSize,
        filters: filters,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.jobs?.length === fetchSize
        ? allPages.length + 1
        : undefined;
    },
    refetchOnMount: true,
    placeholderData: keepPreviousData,
  });

  const jobs = React.useMemo(
    () => data?.pages?.flatMap((page: any) => page?.jobs) ?? [],
    [data]
  );

  useEffect(() => {
    refetch();
  }, [selectedCountry, refetch]);

  const t = useTranslations("Portal");

  const total = data?.pages[0].totalJobCount || 0;

  if (isLoading || (isFetching && !isFetchingNextPage)) {
    return <Loader text={t("fetching_job_details")} />;
  }

  return (
    <InfiniteScroll
      dataLength={jobs.length}
      next={fetchNextPage}
      hasMore={jobs.length < total}
      loader={<Loader text={t("loading_jobs")} />}
    >
      <Container className={`${styles.cardContainer}`}>
        <Row className="g-4">
          {jobs.length > 0 ? (
            jobs.map((job: any, index: number) => (
              <Col key={index} md={6} lg={4} xl={3} className={styles.cardCol}>
                <Card
                  className={`h-100 ${styles.jobCard}`}
                  onClick={() => {
                    router.push(`/jobs/${job._id}`);
                  }}
                >
                  <Image
                    src={
                      job.imageUrl
                        ? `${IMAGE_BASE_URL}/${job.imageUrl}`
                        : "/no_image.jpg"
                    }
                    alt={job._id}
                    className={styles.jobImage}
                    width={378}
                    height={378}
                    layout="responsive"
                  />
                  <Card.Body className={styles.cardBody}>
                    <Card.Title className={styles.cardTitle}>
                      {job?.agency || "Unknown Agency"}
                      <Image
                        src="/icons/verified.svg"
                        width={16}
                        height={16}
                        alt="verified-logo"
                      />
                    </Card.Title>
                    <div className={styles.iconContainer}>
                      {job.amenities.map((amenity: any, idx: number) => (
                        <div
                          key={idx}
                          className={`${styles.iconWrapper} ${
                            idx % 2 !== 0 ? styles.contentRight : ""
                          }`}
                        >
                          <Image
                            src={
                              FACILITIES_IMAGES[
                                amenity as keyof typeof FACILITIES_IMAGES
                              ]
                            }
                            alt={t(amenity.toLowerCase())}
                            width={16}
                            height={16}
                          />
                          <span>{t(amenity.toLowerCase())}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.jobMetaContainer}>
                      <div className={styles.jobMeta}>
                        <Image
                          src={"/icons/clock.svg"}
                          alt="Posted"
                          className="me-1"
                          width={16}
                          height={16}
                        />
                        <span>
                          {job.createdAt
                            ? DateTime.fromISO(job.createdAt).toFormat(
                                "dd-MMM-yyyy"
                              )
                            : "N/A"}
                        </span>
                      </div>
                      <div className={styles.jobMeta}>
                        <Image
                          src={"/icons/alarm-clock-check.svg"}
                          alt="Valid Till"
                          className="me-1"
                          width={16}
                          height={16}
                        />
                        <span>
                          {t("valid_till")}:{" "}
                          {job.expiry
                            ? DateTime.fromISO(job.expiry).toFormat(
                                "dd-MMM-yyyy"
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <NotFound text={t("no_job_found")} />
          )}
        </Row>
      </Container>
    </InfiniteScroll>
  );
};

export default JobPortal;
