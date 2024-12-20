import { useQuery } from "@tanstack/react-query";

import { Loader, NotFound } from "../common/Feedbacks";
import tradestyles from './TradeDetails.module.scss';  
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  COUNTRIES,
  FACILITIES_IMAGES,
  IMAGE_BASE_URL,
} from "@/helpers/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { getJobs } from "@/apis/jobs";

type TradeJobPostingsType = {
  tradeId: string;
  postedJobs: number;
};

type TabType = "active" | "expired";

const JobCard = ({
  type,
  tradeId,
  postedJobs,
}: {
  type: TabType;
  tradeId: string;
  postedJobs: number;
}) => {
  const router = useRouter();
  const t = useTranslations("TradePostings");
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["jobs", tradeId, type],
    queryFn: () => {
      if (tradeId) {
        return getJobs({
          page: 1,
          fetchSize: postedJobs,
          filters: { tradeId: tradeId },
        });
      }
    },
    retry: 3,
  });

  if (isLoading || isFetching) {
    return <Loader text={t('fetching', { type })} />;
  }
  if (error) {
    return (
      <NotFound text={t('fetch_error', { type })} />
    );
  }
  if (!data || !data?.jobs || data?.jobs?.length === 0) {
    return <NotFound text={t('no_jobs', { type })} />;
  }



 const handleJobDetails = (id: string) => {
    router.push(`/posted-jobs/${id}`);
  };

  return (
    <>
      <div className={`${tradestyles.overFlowSection} scroll-box`}>
        {data.jobs.map((job: any) => {
          return (
            <>
              <Row className={tradestyles.jobContainer}>
                <Col md={5} sm={6} className={tradestyles.jobColumn}>
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
                <Col md={7} sm={6} className={tradestyles.agencyJobDetailsContainer}>
                  <div>
                    <div className={tradestyles.heading}>
                      <h3>
                        {t('jobs_for')} {COUNTRIES[job.location as "bh"].label}{" "}
                        <span>
                          {t('approved')} <AiOutlineInfoCircle fontSize={16} />
                        </span>
                      </h3>
                      <ul>
                        <li>{COUNTRIES[job.location as "bh"].label}</li>
                      </ul>
                    </div>
                    <div className={tradestyles.facilities}>
                      <ul>
                      
{job.amenities.map((amenity: string, index: number) => (

    <li key={index}>
      <Image
        src={FACILITIES_IMAGES[amenity as "Food" | "Transportation" | "Stay" | "Recruitment"]} 
        alt={t(amenity.toLowerCase())} 
        width={16}
        height={16}
      />{" "}
      <span>{t(amenity.toLowerCase())}</span> 
    </li>
  ))}
                      </ul>
                    </div>
                  </div>
                  <Link
                    href={`/jobs/${job._id}`}
                    className={`outlined action-buttons ${tradestyles.button}`}
                    onClick={() => handleJobDetails(job.jobId)}
                  >
                    {t('view_details')}
                  </Link>
                </Col>
              </Row>
              <hr className={tradestyles.separator} />
            </>
          );
        })}
      </div>
    </>
  );
};

export const TradeJobPostings: React.FC<TradeJobPostingsType> = ({
  tradeId,
  postedJobs,
}) => {
  return <JobCard type="active" tradeId={tradeId} postedJobs={postedJobs} />;
};
