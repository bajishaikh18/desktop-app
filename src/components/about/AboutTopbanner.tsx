"use client";
import React from "react";
import Slider from "react-slick";
import styles from "./Topbanner.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../common/styles/SliderStylings.scss";
import { Container, Row, Col } from "react-bootstrap";
import Features from "./Feature";

const TopBanner: React.FC = () => {
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  arrows: true,
  prevArrow: undefined, 
  nextArrow: undefined,
};
  
  

  return (
    <div className={styles.sliderContainer}>
      {/* Slider Section */}
     <Slider {...settings}>
        <div className={styles.slide}>
          <Container>
             </Container>
        </div>
        
      </Slider>
      <Container>
        <Row className={styles.contentRow}>
        
          <Col md={6} className={styles.textContainer}>
            <p className={styles.description}>
            Boon.ai is a next-generation job board specifically tailored to connect Indian job seekers with licensed overseas recruitment agencies for employment opportunities in the gulf countries. The platform aims to provide a seamless, user-friendly, and secure recruitment process, addressing the unique challenges faced by job seekers in securing overseas employment, particularly in the Gulf region. Beyond a traditional job board, Boon.ai integrates multiple services to streamline the entire journey— from job search to flight bookings
            </p>
          </Col>

        
          <Col md={6} className={styles.placeholderContainer}>
            <div className={styles.placeholder}></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBanner;
