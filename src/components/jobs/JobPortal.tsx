"use client";
import React from "react";
import Image from "next/image";
import { Row, Col, Card, Container } from "react-bootstrap";
import styles from "./Slider.module.scss";
import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getJobs } from "@/apis/jobs";
import { Loader } from "../common/Feedbacks";
import { FACILITIES_IMAGES, IMAGE_BASE_URL } from "@/helpers/constants";
import { DateTime } from "luxon";

const jobData = [
  {
    title: "Continental Holdings",
    location: "Bahrain",
    imgSrc: "/Bahrain.png",
    salary: "BD 150-250 + OT",
    contact: "hiring@continentalholdings.net",
    icons: ["Food", "Stay", "Transport", "Recruitment"],
    posted: "2 Days ago",
    validtill: "25-Aug-2024",
  },
  {
    title: "AL Arab Arafa",
    location: "Abu Dhabi",
    imgSrc: "/abudhabi.png",
    salary: "1600 + FOOD + OT",
    contact: "resume4@alarabarafa.com",
    posted: "2 Days ago",
    validtill: "25-Aug-2024",
    icons: ["Food", "Stay", "Transport", "Recruitment"],
  },
  {
    title: "Smart Consultancy",
    location: "Saudi Arabia",
    imgSrc: "/saudi.png",
    salary: "",
    contact: "hr2smartconsultancy@gmail.com",
    posted: "2 Days ago",
    validtill: "25-Aug-2024",
    icons: ["Food", "Stay", "Transport", "Recruitment"],
  },
  {
    title: "Dynamic Staffing Services",
    location: "Europe",
    imgSrc: "/europe.png",
    salary: "",
    contact: "vrushali@dss-hr.com",
    posted: "2 Days ago",
    validtill: "25-Aug-2024",
    icons: ["Food", "Stay", "Transport", "Recruitment"],
  },
];

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
  const {data,isLoading, fetchNextPage, isFetching} = useInfiniteQuery<any>({
    queryKey:["joblist"],
    queryFn:({pageParam=1})=>{
      return getJobs((pageParam as number),fetchSize)
    },
    initialPageParam: 1,
    staleTime: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnMount: true,
    placeholderData: keepPreviousData,
  })
  console.log(data);
  // const jobs = data?.jobs || [];

  const jobs = React.useMemo(
    () => data?.pages?.flatMap((page: any) => page?.jobs) ?? [],
    [data]
  );
  if(isLoading){
    return <Loader text="Fetching job details" />
  }
  return (
    <Container className={`py-4 ${styles.CardContainer}`}>
      <Row className="g-4">
        {jobs.map((job:any, index:any) => (
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
                  {/* Top Icons */}
                  {job.amenities.map((amenity:any,idx:number) => {
                    return (
                      <div
                        key={idx}
                        className={`icon-wrapper ${idx%2!=0 ? "justify-content-right" : ""}`}
                      >
                        <Image
                          src={FACILITIES_IMAGES[amenity as "Food"]}
                          alt={amenity}
                          width={16}
                          height={16}
                        />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
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
                       { job.createdAt ? DateTime.fromISO(job.createdAt).toFormat("dd-MMM-yyyy") : "N/A"}
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
                      valid till: { job.expiry ? DateTime.fromISO(job.expiry).toFormat("dd-MMM-yyyy") : "N/A"}
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobPortal;
