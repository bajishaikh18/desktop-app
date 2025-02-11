import React from "react";
import styles from "./OverSeas.module.scss";
import { Col, Container, Row } from "react-bootstrap";

const ContactUs: React.FC = () => {
  return (
    <section className={styles["contact-section"]}>
      <Container>
        <div className={styles["contact-container"]}>
          <h2 className={styles["contact-title"]}>Contact us</h2>

          <div className={styles["contact-items"]}>
            <Row>
              <Col md={4}>
                <div className={styles["contact-item"]}>
                  <img
                    src="/call.png"
                    alt="Phone Icon"
                    className={styles["phone-icon"]}
                  />
                  <div>
                    <h4>Call</h4>
                    <p>+914035031461</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className={styles["contact-item"]}>
                  <img
                    src="/email.png"
                    alt="Email Icon"
                    className={styles["email-icon"]}
                  />
                  <div>
                    <h4>E-mail</h4>
                    <p>support@boonindia.ai</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className={styles["contact-item"]}>
                  <img
                    src="/address.png"
                    alt="Address Icon"
                    className={styles["address-icon"]}
                  />
                  <div>
                    <h4>Address</h4>
                    <p>
                      BOON INFOMATE PRIVATE LIMITED, Latha Nivas Tower, Santos
                      Nagar, Mehdipatnam, Hyderabad-28, Telangana, India.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className={styles["footer"]}>
          © BoonIndia.ai 2024 | All Rights Reserved
        </div>
      </Container>
    </section>
  );
};

export default ContactUs;
