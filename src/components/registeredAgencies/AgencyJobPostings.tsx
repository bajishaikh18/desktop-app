import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Loader, NotFound } from "../common/Feedbacks";
import agencyStyles from "./AgencyDetails.module.scss";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import {
  COUNTRIES,
  FACILITIES_IMAGES,
  IMAGE_BASE_URL,
} from "@/helpers/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { getJobs } from "@/apis/jobs";

type AgencyJobPostingsType = {
  agencyId: string;
  postedJobs: number;
  activeJobCount: number;
  expiredJobCount: number;
};

type TabType = "active" | "expired";

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
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["jobs", agencyId, type],
    queryFn: () => {
      if (agencyId) {
        return getJobs({
          page: 0,
          fetchSize: postedJobs,
          filters: { agencyId: agencyId },
        });
      }
    },
    retry: 3,
  });

  if (isLoading || isFetching) {
    return <Loader text={`Fetching ${type} jobs`} />;
  }
  if (error) {
    return (
      <NotFound text={`Something went wrong while fetching ${type} jobs`} />
    );
  }
  if (!data || !data?.jobs || data?.jobs?.length === 0) {
    return <NotFound text={`No ${type} jobs found for the agency`} />;
  }

  const handleJobDetails = (id: string) => {
    router.push(`/posted-jobs/${id}`);
  };

  return (
    <>
      <div className={`${agencyStyles.overFlowSection} scroll-box`}>
        {data.jobs.map((job: any) => {
          return (
            <>
              <Row className={agencyStyles.jobContainer}>
                <Col md={5} className={agencyStyles.jobColumn}>
                  <Image
                    src={`${
                      job.imageUrl
                        ? `${IMAGE_BASE_URL}/${job.imageUrl}`
                        : "/no_image.jpg"
                    }`}
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
                <Col md={7} className={agencyStyles.agencyJobDetailsContainer}>
                  <div>
                    <div className={agencyStyles.heading}>
                      <h3>
                        Jobs for {COUNTRIES[job.location as "bh"].label}{" "}
                        <span>
                          Approved <AiOutlineInfoCircle fontSize={16} />
                        </span>
                      </h3>
                      <ul>
                        <li>{COUNTRIES[job.location as "bh"].label}</li>
                      </ul>
                    </div>
                    <div className={agencyStyles.facilities}>
                      <ul>
                        {job.amenities.map((amenity: string, index: number) => (
                          <li key={index}>
                            <Image
                              src={FACILITIES_IMAGES[amenity as "Food"]}
                              alt={amenity}
                              width={16}
                              height={16}
                            />{" "}
                            <span>{amenity}</span>
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
                    View Job Details
                  </Link>
                </Col>
              </Row>
              <hr className={agencyStyles.separator} />
            </>
          );
        })}
      </div>
    </>
  );
};

export const AgencyJobPostings: React.FC<AgencyJobPostingsType> = ({
  agencyId,
  postedJobs,
}) => {
  return <JobCard type="active" agencyId={agencyId} postedJobs={postedJobs} />;
};
