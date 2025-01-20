import React from "react";
import styles from "./OverSeas.module.scss"; 
import ContactUs from "./ContactUs"; 
import { Col, Container, Row } from "react-bootstrap";

const VisionSection: React.FC = () => {
  return (
    <>
            <section className={styles["vision-section"]}>
      <Container>
        <Row>
          <Col md={6}>
          <div className={styles["vision-content"]}>
            <h2>Our Vision</h2>
            <p>
              Boon.ai’s business model not only aims to connect job seekers with
              Gulf employers but provides a holistic and streamlined experience
              from job search to relocation. With a focus on safety,
              transparency, and ease of use, Boon.ai is poised to become the
              leading platform for Indian workers seeking overseas employment
              opportunities in the Gulf.
            </p>
          </div>
          </Col>
          <Col md={6}>

          <div className={styles["vision-placeholder"]}></div>
          </Col>
          </Row>
      </Container>
      </section>

      <ContactUs />
    </>
  );
};

export default VisionSection;
