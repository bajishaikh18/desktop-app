"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "../common/styles/Details.module.scss";
import agencyStyles from "./AgencyDetails.module.scss";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Dropdown,
  Modal,
  Row,
} from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { Loader, NotFound } from "../common/Feedbacks";
import toast from "react-hot-toast";
import Link from "next/link";
import { AgencyJobPostings } from "./AgencyJobPostings";
import { IMAGE_BASE_URL } from "@/helpers/constants";
import { INDIAN_STATES } from "@/helpers/states";
import { getAgencyDetails } from "@/apis/jobs";


type PostedJobDetailsProps = {
  agencyId: string;
};

const AgencyDetails: React.FC<PostedJobDetailsProps> = ({ agencyId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["agencyDetails", agencyId],
    queryFn: () => {
      if (agencyId) {
        return getAgencyDetails(agencyId);
      }
      throw new Error("jobId is null or undefined");
    },
    enabled: !!agencyId,
  });

  const { _id, regNo, name, address,phone,postedJobs,profilePic,city,state, website, email, status,activeJobCount,expiredJobCount } =
    (data?.agency as any) || {};

  const goBack = () => {
    router.back();
  };


  if (isLoading) {
    return (
      <main className="main-section">
        <Loader text="Loading agency details" />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="main-section">
        <NotFound text="Oops!, looks like agency details are not present" />
      </main>
    );
  }
  if (isError) {
    return (
      <main className="main-section">
        <NotFound text="Something went wrong while accessing agency details. Please try again" />
      </main>
    );
  }


  return (
    <main className="main-section">
      <Container fluid>
        <Row>
          <Col lg={4}>
            <Card className={styles.summaryCard}>
              <CardHeader className={agencyStyles.summaryCardHeader}>
                <div className={styles.agencyDetails}>
                  <Image
                    src={`${profilePic ? `${IMAGE_BASE_URL}/${profilePic}`: '/no_image.jpg'}`}
                    width={66}
                    height={66}
                    alt="agency-logo"
                  />
                  <div>
                    <div className={styles.agencyNameContainer}>
                      <h2 className={styles.agencyName}>{name}</h2>
                      <Image
                        src="/verified.svg"
                        width={13}
                        height={13}
                        alt="agency-logo"
                      />
                    </div>
                    <p className={agencyStyles.regNo}>
                      {regNo || "REG No: B-1853/MUM/COM/1000+/5/0242/2023 "}
                    </p>
                  </div>
                </div>
                <h5 className={`${agencyStyles.approvedText} success`}>
                  Approved by Ministry of External affairs Govt of India
                </h5>
              </CardHeader>
              <CardBody className={styles.summaryCardBody}>
              <ul className={`${styles.jobInfoList} ${agencyStyles.agencyInfoList}`}>
                  <li>
                    <Image
                      src={"/icons/suitcase.png"}
                      width={24}
                      height={20}
                      alt="suitcase"
                    />
                    <span>{postedJobs} Jobs Posted</span>
                  </li>
                </ul>
                <div className={agencyStyles.addressSection}>
                    <h3>Address</h3>
                    <p>{address}, {city || ""}, {INDIAN_STATES.find(x=>x.state_code===state)?.name || state || ""}</p>

                    <iframe
                        height="216"
                        style={{border:0,width:"100%"}}
                        loading="lazy"
                        src="https://www.google.com/maps/place/Splitbit+Innovative+Solutions/@17.4449405,78.3856523,15z/data=!4m6!3m5!1s0x3bcb934575864743:0x4e49a96c37440063!8m2!3d17.4449405!4d78.3856523!16s%2Fg%2F11pw8r8w2c?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D">
                        </iframe>
                </div>
                <div className={agencyStyles.contactSection}>
                    <h3>Contact</h3>
            <ul className={`${styles.jobInfoList} ${agencyStyles.agencyContactList}`}>
                  <li>
                    <Image
                      src={"/icons/phone.png"}
                      width={16}
                      height={16}
                      alt="phone"
                    />
                    <a href={`tel:${phone}`}>{phone}</a>

                  </li>
                  <li>
                    <Image
                      src={"/icons/mail.svg"}
                      width={16}
                      height={16}
                      alt="mail"
                    />
                    <a href={`mailto:${email}`}>{email}</a>

                  </li>
                </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className={`${styles.detailsCard} ${agencyStyles.detailsCard}`}>
              <CardHeader className={`${styles.detailsCardHeader} ${agencyStyles.detailsCardHeader}`}>
                <div className={agencyStyles.detailInfoHeader}>
                 <h3>Jobs Posted by {name} ({postedJobs})</h3>
                </div>
                <div className={styles.actionContainer}>
              
                  <Dropdown>
                    <Dropdown.Toggle
                      className={styles.dropdownButton}
                      variant="success"
                      id="dropdown-basic"
                    >
                      <BsThreeDots fontSize={24} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                     

                      <Dropdown.Item onClick={()=>{}}>
                        Notify jobs for this agency
                      </Dropdown.Item>
                      <Dropdown.Item  onClick={()=>{}}>
                        Report an issue
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </CardHeader>
              <CardBody className={agencyStyles.detailCardBody}>
                    <AgencyJobPostings agencyId={_id} postedJobs={postedJobs} activeJobCount={activeJobCount} expiredJobCount={expiredJobCount}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AgencyDetails;
