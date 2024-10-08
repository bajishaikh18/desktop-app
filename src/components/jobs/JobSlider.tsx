'use client';
import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import JobSearch from '@/components/jobs/JobSearch';
import styles from './Slider.module.scss';  
import './styling.scss';  
import { useTranslations } from 'next-intl';

const JobSlider: React.FC = () => {
  const t = useTranslations("Slider");
  // Slider settings
  const settings = {
    dots: true,
    dotsClass: "slider-dots",
    infinite: false,  // No infinite loop
    speed: 500,
    slidesToShow: 1,  // Show one image at a time
    slidesToScroll: 1,  // Scroll one image at a time
    autoplay: true,
    autoplaySpeed: 3000,  // Automatically scroll every 3 seconds
    arrows: true,
    prevArrow: <button className="slider-arrow slick-prev">❮</button>,
    nextArrow: <button className="slider-arrow slick-next">❯</button>,
  };

  // Submit search query connected to an API or search logic
  const handleSearch = (searchTerm: string, selectedLocation: string) => {
    console.log(`Searching for: ${searchTerm} in ${selectedLocation}`);
    // Implement job fetching logic here
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {/* First Slide */}
        <div>
          <Image src="/slider.png" alt="Slider Image" fill={true} />
         
          <div className={styles.overlay}>
            <h1 className={`${styles.textCommon} ${styles.title}`}>
              {t('apply_International_Job_Openings_across')}
            </h1>
            <h2 className={`${styles.textCommon} ${styles.subtitle}`}>
              {t('dubai,_Qatar,_Oman,_Bahrain_&_Saudi_Arabia')}
            </h2>
           
            <div className={styles.buttonRightContainer}>
              <button className={styles.viewJobsButton} onClick={() => window.location.href = '/jobs'}>
                {t('view_Job')}
              </button>
            </div>
           </div>
         
         
        </div>

        {/* Second Slide */}
        <div>
          <Image
            src="/slider2.png"  // Path to the second image
            alt="Slider Image 2"
            layout="responsive"
            width={1440}
            height={190}
          />
        </div>
      </Slider>

      {/* Integrate the JobSearch component */}
      <JobSearch onSearch={handleSearch} />

      {/* Job Listings */}
      <div className={styles.jobListingContainer}>
        <div className={styles.jobList}>
          <span className={styles.latestJobsTitle}>{t('latest_Jobs')}</span>
          <span>{t('jobs_in_Oman')}</span>
          <span>{t('jobs_in_Qatar')}</span>
          <span>{t('jobs_in_Kuwait')}</span>
          <span>{t('jobs_in_Dubai')}</span>
          <span>{t('jobs_in_Bahrain')}</span>
        </div>
      </div>
    </div>
  );
};

export default JobSlider;
