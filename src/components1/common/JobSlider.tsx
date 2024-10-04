"use client";
import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import JobSearch from '@/components1/common/JobSearch';
import styles from './Slider.module.scss';
import '@/app/globals.scss'; 
const JobSlider: React.FC = () => {
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
          <div className={styles.unionImageContainer}>
            <Image src="/Union.png" alt="Union Icon" width={6.25} height={10} />
          </div>
          <div className={styles.overlay}>
            <h1 className={`${styles.textCommon} ${styles.title}`}>
              Apply International Job Openings across
            </h1>
            <h2 className={`${styles.textCommon} ${styles.subtitle}`}>
              Dubai, Qatar, Oman, Bahrain & Saudi Arabia
            </h2>
            <div className={styles.buttonRightContainer}>
              <button className={styles.viewJobsButton} onClick={() => window.location.href = '/jobs'}>
                View Job
              </button>
            </div>
            <div className={styles.unionImageRightContainer}>
              <Image src="/Union (1).png" alt="Union Right Icon" width={6.25} height={10} />
            </div>
          </div>
          <div className={styles.sliderLogoContainer}>
            <Image src="/sliderlogo.png" alt="Slider Logo" width={58} height={5} />
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
          <span className={styles.latestJobsTitle}>Latest Jobs</span>
          <span>Occupation</span>
          <span>Jobs in Oman</span>
          <span>Jobs in Qatar</span>
          <span>Jobs in Kuwait</span>
          <span>Jobs in Dubai</span>
          <span>Jobs in Bahrain</span>
        </div>
      </div>
    </div>
  );
};

export default JobSlider;
