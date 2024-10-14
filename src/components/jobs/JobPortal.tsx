"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Row, Col, Card, Container } from "react-bootstrap";
import styles from "./Slider.module.scss";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getJobs } from "@/apis/jobs";
import { Loader } from "../common/Feedbacks";
import { FACILITIES_IMAGES, IMAGE_BASE_URL } from "@/helpers/constants";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";

// Icon mapping for amenities
const iconMap: { [key: string]: string } = {
  Food: "/food.png",
  Stay: "/stay.png",
  Transport: "/transport.png",
  Recruitment: "/recruitment.png",
  Clock: "/clock.png",
  Alarm: "/alarm-clock-check.png",
};

const JobPortal: React.FC<{ selectedCountry: string }> = ({ selectedCountry }) => {
  const fetchSize = 10;

  const router = useRouter();
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    hasNextPage,
  } = useInfiniteQuery<any>({
    queryKey: ["joblist", selectedCountry],
    queryFn: ({ pageParam = 1 }) => getJobs(pageParam as number, fetchSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.jobs?.length === fetchSize ? allPages.length + 1 : undefined;
    },
    refetchOnMount: true,
    placeholderData: keepPreviousData,
  });

  const jobs = React.useMemo(
    () => data?.pages?.flatMap((page: any) => page?.jobs) ?? [],
    [data]
  );

  const activeJobs = React.useMemo(() => {
    const allActiveJobs = jobs.filter((job: any) => job.status === "active");

    // Only return jobs from the selected country if a country is selected
    if (selectedCountry) {
      return allActiveJobs.filter((job: any) => job.country === selectedCountry);
    }

    return allActiveJobs;
  }, [jobs, selectedCountry]);

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

  if (isLoading) {
    return <Loader text="Fetching job details" />;
  }
  

  return (
    <Container className={`${styles.cardContainer}`}>
      <Row className="g-4">
        {activeJobs.length > 0 ? (
          activeJobs.map((job: any, index: number) => (
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
                    {typeof job.agencyId === "string" ? job.agencyId : job.agencyId?.name || "Unknown Agency"} 
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
                        className={`${styles.iconWrapper} ${idx % 2 !== 0 ? "justify-content-right" : ""}`}
                      >
                        <Image
                          src={FACILITIES_IMAGES[amenity as keyof typeof FACILITIES_IMAGES]}
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
                      <Image src={iconMap["Clock"]} alt="Posted" className="me-1" width={16} height={16} />
                      <span>
                        {job.createdAt ? DateTime.fromISO(job.createdAt).toFormat("dd-MMM-yyyy") : "N/A"}
                      </span>
                    </div>
                    <div className={styles.jobMeta}>
                      <Image src={iconMap["Alarm"]} alt="Valid Till" className="me-1" width={16} height={16} />
                      <span>
                        Valid till: {job.expiry ? DateTime.fromISO(job.expiry).toFormat("dd-MMM-yyyy") : "N/A"}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>No active jobs available.</div>
        )}
      </Row>

      {hasNextPage && <div ref={loadMoreRef} style={{ height: "20px" }} />}
      {isFetchingNextPage && <Loader text="Loading more jobs..." />}
    </Container>
  );
};

export default JobPortal;
