import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Image from "next/image";

import VisionSection from "./Vision";

const OverseasJobSeekers: React.FC = () => {
  return (
    <div className="py-5">
      <Card className="p-4 bg-white shadow-md rounded-lg w-100" style={{ width: "100%" }}>
        <Container>
          <h1 className="display-4 text-primary mb-3" style={{ fontSize: "30px" }}>
            Ideal Solution for Overseas Job Seekers
          </h1>
          <p className="text-muted mb-4">
            Boon.ai revolutionizes the overseas recruitment process for Indian workers through
          </p>
          <Row className="mb-4">
            <Col md={3} className="d-flex align-items-start mb-3">
              <Image
                src="/checkbox.png"
                alt="Check Icon"
                width={14}
                height={16}
                style={{ position: "relative", top: "5px" }}
                className="me-2"
              />
              <p className="text-muted">
                AI-powered job search and application system for speed and accuracy
              </p>
            </Col>
            <Col md={3} className="d-flex align-items-start mb-3">
              <Image
                src="/checkbox.png"
                alt="Check Icon"
                width={14}
                height={16}
                style={{ position: "relative", top: "5px" }}
                className="me-2"
              />
              <p className="text-muted">
                Currency conversion for salary transparency to ensure clarity on compensation.
              </p>
            </Col>
            <Col md={3} className="d-flex align-items-start mb-3">
              <Image
                src="/checkbox.png"
                alt="Check Icon"
                width={14}
                height={16}
                style={{ position: "relative", top: "5px" }}
                className="me-2"
              />
              <p className="text-muted">
                Skilled worker video uploads to showcase talent and improve job match
              </p>
            </Col>
            <Col md={3} className="d-flex align-items-start mb-3">
              <Image
                src="/checkbox.png"
                alt="Check Icon"
                width={14}
                height={16}
                style={{ position: "relative", top: "5px" }}
                className="me-2"
              />
              <p className="text-muted">
                A safe, scam-free recruitment environment with licensed agency listings
              </p>
            </Col>
            <Col md={3} className="d-flex align-items-start mb-3">
              <Image
                src="/checkbox.png"
                alt="Check Icon"
                width={14}
                height={16}
                style={{ position: "relative", top: "5px" }}
                className="me-2"
              />
              <p className="text-muted">
                Seamless service integrations for medical tests, document attestation, and flight bookings.
              </p>
            </Col>
            <Col md={9} className="d-flex align-items-center">
              <p className="text-muted">
                With these tools in one platform, Boon.ai simplifies the entire recruitment journey, making it
                quicker, safer, and more transparent for Indian job seekers pursuing opportunities in the Gulf
                region.
              </p>
            </Col>
          </Row>
        </Container>
      </Card>
      <VisionSection />
    </div>
   
  );
};

export default OverseasJobSeekers;
