"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import JobSearch from '@/components/jobs/JobSearch'; 
import JobPortal from '@/components/jobs/JobPortal';
import styles from './Slider.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import './styling.scss';
import { useTranslations } from 'next-intl';
import { Container } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const JobSlider: React.FC = () => {
  const t = useTranslations("Slider");
  const [selectedCountry, setSelectedCountry] = useState<string>(''); 

  const settings = {
    dots: true,
    dotsClass: "slider-dots",
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <button className="slider-arrow slick-prev"><FaChevronLeft fontSize={14}/></button>,
    nextArrow: <button className="slider-arrow slick-next"><FaChevronRight fontSize={14}/></button>,
  };

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode); 
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {/* First Slide */}
        <div className={styles.slide}>
          {/* <Image src="/slider.png" alt="Slider Image" fill={true} /> */}
          <Container>
          <div className={styles.overlay}>
          <div>

            <h1 className={`${styles.textCommon} ${styles.title}`}>
              {t('apply_International_Job_Openings_across')}
            </h1>
            <h2 className={`${styles.textCommon} ${styles.subtitle}`}>
              {t('dubai,_Qatar,_Oman,_Bahrain_&_Saudi_Arabia')}
            </h2>
            </div>
            <div className={styles.buttonRightContainer}>
              <button className={styles.viewJobsButton} onClick={() => window.location.href = '/jobs'}>
                {t('view_Job')}
              </button>
            </div>
          </div>
          </Container>
        </div>
        <div className={styles.slide}>
          {/* <Image src="/slider.png" alt="Slider Image" fill={true} /> */}
          <Container>
          <div className={styles.overlay}>
          <div>

            <h1 className={`${styles.textCommon} ${styles.title}`}>
              {t('apply_International_Job_Openings_across')}
            </h1>
            <h2 className={`${styles.textCommon} ${styles.subtitle}`}>
              {t('dubai,_Qatar,_Oman,_Bahrain_&_Saudi_Arabia')}
            </h2>
            </div>
            <div className={styles.buttonRightContainer}>
              <button className={styles.viewJobsButton} onClick={() => window.location.href = '/jobs'}>
                {t('view_Job')}
              </button>
            </div>
          </div>
          </Container>
        </div>
        {/* Second Slide */}
        {/* <div>
          <Image
            src="/slider2.png"
            alt="Slider Image 2"
            layout="responsive"
            width={1440}
            height={190}
          />
        </div> */}
      </Slider>
      
     
      <JobSearch />
    
      <div className={styles.jobListingContainer}>
        <div className={styles.jobList}>
          <span className={styles.latestJobsTitle}>{t('latest_Jobs')}</span>
          <span
            className={selectedCountry === 'om' ? styles.active : ''}
            onClick={() => handleCountrySelect('om')}
          >
            {t('jobs_in_Oman')}
          </span>
          <span
            className={selectedCountry === 'qa' ? styles.active : ''}
            onClick={() => handleCountrySelect('qa')}
          >
            {t('jobs_in_Qatar')}
          </span>
          <span
            className={selectedCountry === 'kw' ? styles.active : ''}
            onClick={() => handleCountrySelect('kw')}
          >
            {t('jobs_in_Kuwait')}
          </span>
          <span
            className={selectedCountry === 'ae' ? styles.active : ''}
            onClick={() => handleCountrySelect('ae')}
          >
            {t('jobs_in_Dubai')}
          </span>
          <span
            className={selectedCountry === 'bh' ? styles.active : ''}
            onClick={() => handleCountrySelect('bh')}
          >
            {t('jobs_in_Bahrain')}
          </span>
        </div>
      </div>

      {/* Pass the selected country to the JobPortal */}
      <JobPortal selectedCountry={selectedCountry} />
    </div>
  );
};

export default JobSlider;
