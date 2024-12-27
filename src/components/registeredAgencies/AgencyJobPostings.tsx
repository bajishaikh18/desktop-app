"use client";
import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader, NotFound } from "../common/Feedbacks";
import agencyStyles from "./AgencyDetails.module.scss";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { COUNTRIES, FACILITIES_IMAGES, IMAGE_BASE_URL } from "@/helpers/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineInfoCircle } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { getJobs } from "@/apis/jobs";

type AgencyJobPostingsType = {
  agencyId: string;
  postedJobs: number;
};

type TabType = "active" | "expired";

type Job = {
  _id: string;
  imageUrl?: string;
  jobId: string;
  location: string;
  amenities: string[];
};

const JobCard = ({
  type,
  agencyId,
  postedJobs,
}: {
  type: TabType;
  agencyId: string;
  postedJobs: number;
}) => {
  const router = useRouter();
  const t = useTranslations("AgencyPostings");

  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["jobs", agencyId, type],
    queryFn: async ({ pageParam = 1 }) => {
      if (agencyId) {
        return getJobs({
          page: pageParam,
          fetchSize: postedJobs,
          filters: { agencyId: agencyId },
        });
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage ?? false;
    },
    retry: 3,
    initialPageParam: 1, 
  });

  const jobs: Job[] = data?.pages.flatMap((page) => page.jobs) ?? [];

  if (isLoading || isFetching) {
    return <Loader text={t("fetching", { type })} />;
  }
  if (error) {
    return <NotFound text={t("fetch_Error", { type })} />;
  }
  if (jobs.length === 0) {
    return <NotFound text={t("no_jobs", { type })} />;
  }

  const handleJobDetails = (id: string) => {
    router.push(`/posted-jobs/${id}`);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={jobs.length}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader={<Loader text="Loading jobs..." />}
      >
        <div className={`${agencyStyles.overFlowSection} scroll-box`}>
          {jobs.map((job: Job) => (
            <Row className={agencyStyles.jobContainer} key={job._id}>
              <Col md={5} sm={6} className={agencyStyles.jobColumn}>
                <Image
                  src={`${job.imageUrl ? `${IMAGE_BASE_URL}/${job.imageUrl}` : "/no_image.jpg"}`}
                  alt="Rectangle"
                  height={305}
                  width={800}
                  blurDataURL="/no_image.jpg"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </Col>
              <Col md={7} sm={6} className={agencyStyles.agencyJobDetailsContainer}>
                <div>
                  <div className={agencyStyles.heading}>
                    <h3>
                      {t("jobs_for")} {COUNTRIES[job.location as keyof typeof COUNTRIES].label}{" "}
                      <span>
                        {t("approved")} <AiOutlineInfoCircle fontSize={16} />
                      </span>
                    </h3>
                    <ul>
                      <li>{COUNTRIES[job.location as keyof typeof COUNTRIES].label}</li>
                    </ul>
                  </div>
                  <div className={agencyStyles.facilities}>
                    <ul>
                      {job.amenities.map((amenity: string, index: number) => (
                        <li key={index}>
                          <Image
                            src={FACILITIES_IMAGES[amenity as keyof typeof FACILITIES_IMAGES]}
                            alt={t(amenity.toLowerCase())}
                            width={16}
                            height={16}
                          />
                          <span>{t(amenity.toLowerCase())}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link
                  href={`/jobs/${job._id}`}
                  className={`outlined action-buttons ${agencyStyles.button}`}
                  onClick={() => handleJobDetails(job.jobId)}
                >
                  {t("view_details")}
                </Link>
              </Col>
               
            </Row>
            
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export const AgencyJobPostings: React.FC<AgencyJobPostingsType> = ({ agencyId, postedJobs }) => {
  return <JobCard type="active" agencyId={agencyId} postedJobs={postedJobs} />;
};
