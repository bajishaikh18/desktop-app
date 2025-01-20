import React from "react";
import Image from "next/image";
import OverseasJobSeekers from "./OverSeas";
import { Container, Row, Col, Card } from "react-bootstrap";

const Features: React.FC = () => {
  const features = [
    {
      image: "/1.svg",
      title: "Specialized Platform for Gulf Jobs",
      description:
        "Boon.ai focuses exclusively on Gulf job opportunities for Indian workers, providing a centralized platform that consolidates job postings from registered agencies and employers in the Gulf. This tailored approach ensures better job matching and a more streamlined recruitment process.",
    },
    {
      image: "/2.svg",
      title: "AI–Powered Job Ad Conversion",
      description:
        "Boon.ai uses AI and ML to extract job titles and details from JPEG and PDF job ads. This allows job seekers to easily select relevant job titles and apply directly through the platform, eliminating the need to manually note down email IDs and draft emails with attachments for every job.",
    },
    {
      image: "/3.svg",
      title: "Direct Job Applications",
      description:
        "Job seekers can apply directly for jobs through the Boon.ai platform without the need to manually email documents or draft emails. This simplifies the application process and reduces the likelihood of errors such as missing attachments or incorrect email addresses.",
    },
    {
      image: "/4.svg",
      title: "Work Video Upload for Skilled Workers",
      description:
        "Skilled workers can upload work videos showcasing their skills, which will help licensed recruitment agencies and employers better assess their qualifications. This feature provides a powerful way for skilled workers to showcase their abilities beyond a traditional resume, increasing their chances of being shortlisted for roles.",
    },
    {
      image: "/5.svg",
      title: "Currency Calculator for Salary Transparency",
      description:
        "Boon.ai is the first job portal in the industry to provide a currency calculator for each job posting. This feature helps job seekers convert salary figures from foreign currencies to Indian Rupees (INR), offering greater transparency and clarity about the compensation they will receive in the Gulf region.",
    },
    {
      image: "/6.svg",
      title: "Complete Directory of Licensed Agencies & Trade Centers",
      description:
        "Boon.ai offers a comprehensive directory of licensed overseas recruitment agencies and technical trade centers across India. Each listing includes contact numbers, email IDs, and addresses, all linked to Google Maps for easy navigation, ensuring job seekers can confidently connect with legitimate agencies and avoid exploitation by unlicensed agents.",
    },
  ];

  return (
    <section style={{ padding: "50px 0", backgroundColor: "#f9f9fc" }}>
      <Container>
        <Row>
          {features.map((feature, index) => (
            <Col xs={12} sm={6} lg={4} className="d-flex mb-4" key={index}>
              <Card
                style={{
                  background: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  padding: "10px 0px",
                  textAlign: "left",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                className="d-flex flex-column"
              >
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "36px",
                        height: "43px",
                        backgroundColor: "#f1f5eb",
                        borderRadius: "50%",
                        marginRight: "12px",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={feature.image}
                        alt={`Feature ${index + 1}`}
                        width={21}
                        height={40}
                      />
                    </div>
                    <Card.Title
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#1E202D",
                        margin: 0,
                      }}
                    >
                      {feature.title}
                    </Card.Title>
                  </div>
                  <Card.Text
                    style={{
                      fontSize: "14px",
                      color: "#727272",
                      lineHeight: "24px",
                    }}
                  >
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <OverseasJobSeekers />
    </section>
  );
};

export default Features;
