"use client";
import React, { useState } from 'react';

import Slider from 'react-slick';
import Search from '@/components/walkins/WalkinsSearch'; 
import Portal from '@/components/walkins/WalkinsPortal';
import styles from './Slider.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../common/styles/SliderStylings.scss';
import { useTranslations } from 'next-intl';
import { Container } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const WalkinsSlider: React.FC = () => {
  const t = useTranslations("WalkinsSlider");
  const [selectedCountry, setSelectedCountry] = useState<string>(''); 
  const [field, setField] = useState(""); 
  const [filter, setFilter] = useState(""); 
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

  const handleSearch = (searchTerm:string)=>{
    setField("jobTitle");
    setFilter(searchTerm);
  }
  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        <div className={styles.slide}>
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
      </Slider>
      
     <Container fluid>
      <Search onSearch={handleSearch} onCountryChange={setSelectedCountry} />
      </Container>
      <div className={styles.jobListingContainer}>
        <div className={styles.jobList}>
          <span            onClick={() => handleCountrySelect('')}
      className={selectedCountry === '' ? styles.active : ''}>{t('latest_walkins')}</span>
          <span
            className={selectedCountry === 'om' ? styles.active : ''}
            onClick={() => handleCountrySelect('om')}
          >
            {t('walkin_oman')}
          </span>
          <span
            className={selectedCountry === 'qa' ? styles.active : ''}
            onClick={() => handleCountrySelect('qa')}
          >
            {t('walkin_qatar')}
          </span>
          <span
            className={selectedCountry === 'kw' ? styles.active : ''}
            onClick={() => handleCountrySelect('kw')}
          >
            {t('walkin_kuwait')}
          </span>
          <span
            className={selectedCountry === 'ae' ? styles.active : ''}
            onClick={() => handleCountrySelect('ae')}
          >
            {t('walkin_dubai')}
          </span>
          <span
            className={selectedCountry === 'sa' ? styles.active : ''}
            onClick={() => handleCountrySelect('sa')}
          >
            {t('walkin_saudi')}
          </span>
          <span
            className={selectedCountry === 'bh' ? styles.active : ''}
            onClick={() => handleCountrySelect('bh')}
          >
            {t('walkin_bahrain')}
          </span>
        </div>
      </div>

      {/* Pass the selected country to the JobPortal */}
      <Portal selectedCountry={selectedCountry} filter={filter} field={field} />

      
    </div>
  );
};

export default WalkinsSlider;
