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
// Icon mapping for amenities
const iconMap: { [key: string]: string } = {
  Food: "/food.png",
  Stay: "/stay.png",
  Transport: "/transport.png",
  Recruitment: "/recruitment.png",
  Clock: "/clock.png",
  Alarm: "/alarm-clock-check.png",
};


const fetchSize = 10;

const JobPortal: React.FC = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<any>({
    queryKey: ["joblist"],
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
    <Container className={`py-4 ${styles.CardContainer}`}>
      <Row className="g-4">
        {jobs.map((job: any, index: any) => (
          <Col key={index} md={6} lg={4} xl={3}>
            <Card className={`h-100 shadow-sm p-3 ${styles.jobCard}`}>
              <Image
                src={`${IMAGE_BASE_URL}/${job.imageUrl}`}
                alt={job._id}
                className="card-img-top"
                width={301}
                height={378}
                layout="responsive"
              />
              <Card.Body>
                <Card.Title className="mb-3">{job.agencyId}</Card.Title>
                <div className="icon-container top-icons">
                  {job.amenities.map((amenity: any, idx: number) => (
                    <div
                      key={idx}
                      className={`icon-wrapper ${
                        idx % 2 !== 0 ? "justify-content-right" : ""
                      }`}
                    >
                      <Image
                        src={FACILITIES_IMAGES[amenity as "Food"]}
                        alt={amenity}
                        width={16}
                        height={16}
                      />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
                <div className="d-flex align-items-center gap-3 w-100">
                  <div
                    className="d-flex align-items-center flex-nowrap"
                    style={{ marginLeft: "-25px" }}
                  >
                     <Image
                      src={iconMap["Clock"]}
                      alt="Posted"
                      className="me-1"
                      width={16}
                      height={16}
                    />

                    <span
                      className="text-muted"
                      style={{ fontSize: "14px", whiteSpace: "nowrap" }}
                    >
                      {job.createdAt
                        ? DateTime.fromISO(job.createdAt).toFormat("dd-MMM-yyyy")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="d-flex align-items-center flex-nowrap">
                  <Image
                      src={iconMap["Alarm"]}
                      alt="Valid Till"
                      className="me-1"
                      width={16}
                      height={16}
                    />

                    <span
                      className="text-muted"
                      style={{ fontSize: "14px", whiteSpace: "nowrap" }}
                    >
                      valid till:{" "}
                      {job.expiry
                        ? DateTime.fromISO(job.expiry).toFormat("dd-MMM-yyyy")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      
      <div ref={loadMoreRef} className="load-more-container">
        {isFetchingNextPage ? (
          <Loader text="Loading more jobs..." size="sm" textSize="sm" />
        ) : null}
      </div>
    </Container>
  );
};

export default JobPortal;
