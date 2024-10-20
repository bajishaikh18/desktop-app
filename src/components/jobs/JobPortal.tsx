"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Row, Col, Card, Container } from "react-bootstrap";
import styles from "../common/styles/Card.module.scss";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getJobs } from "@/apis/jobs";
import { Loader, NotFound } from "../common/Feedbacks";
import { FACILITIES_IMAGES, IMAGE_BASE_URL } from "@/helpers/constants";
import { DateTime } from "luxon";
// @ts-ignore
import { useRouter } from 'nextjs-toploader/app';


const JobPortal: React.FC<{
  selectedCountry: string;
  field: string;
  filter: string;
}> = ({ selectedCountry, field, filter }) => {
  const fetchSize = 8;
  const router = useRouter();
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    hasNextPage,
  } = useInfiniteQuery<any>({
    queryKey: ["joblist", selectedCountry,field,filter],
    queryFn: ({ pageParam = 1 }) =>{
      const filtersPlaceholder = {
        location: selectedCountry,
        [field as "jobTitle"]: filter
      };
      const filters = Object.entries(filtersPlaceholder).reduce((obj,[key,val])=>{
        if(key && val){
          obj[key as "jobTitle"]= val;
        }
        return obj
      },{} as { jobTitle?:string,location?:string})
      
      return getJobs({
        page: pageParam as number,
        fetchSize: fetchSize,
        filters:filters
      })
    }
     ,
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

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    observer.current = new IntersectionObserver(callback);

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading || isFetching) {
    return <Loader text="Fetching job details" />;
  }

  return (
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
                  src={`${IMAGE_BASE_URL}/${job.imageUrl}`}
                  alt={job._id}
                  className={styles.jobImage}
                  width={378}
                  height={378}
                  layout="responsive"
                />
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.cardTitle}>
                    {typeof job.agencyId === "string"
                      ? job.agencyId
                      : job.agencyId?.name || "Unknown Agency"}
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
                          alt={amenity}
                          width={16}
                          height={16}
                        />
                        <span>{amenity}</span>
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
                        Valid till:{" "}
                        {job.expiry
                          ? DateTime.fromISO(job.expiry).toFormat("dd-MMM-yyyy")
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <NotFound text="No Job Found"/>
        )}
      </Row>

      {hasNextPage && <div ref={loadMoreRef} style={{ height: "20px" }} />}
      {isFetchingNextPage && <Loader text="Loading more jobs..." />}
    </Container>
  );
};

export default JobPortal;
