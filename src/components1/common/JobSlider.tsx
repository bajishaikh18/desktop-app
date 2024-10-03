import React, { useState } from 'react';
import Image from 'next/image'; 
import Slider from 'react-slick';
import styles from './Slider.module.scss';

const JobSlider: React.FC = () => {
  // State for managing search input and selected location
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('Dubai');

  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle location dropdown change
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };

  // Submit search query connected to an API or search logic
  const handleFindJobs = () => {
    console.log(`Searching for: ${searchTerm} in ${selectedLocation}`);
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        <div>
          <Image 
            src="/slider.png" alt="Slider Image" layout="responsive" width={1440} height={190} />
          <div className={styles.unionImageContainer}>
            <Image src="/Union.png" alt="Union Icon" width={6.25} height={10} />
          </div>

          <div className={styles.overlay}>
            <h1 className={`${styles.textCommon} ${styles.title}`}>Apply International Job Openings across</h1>
            <h2 className={`${styles.textCommon} ${styles.subtitle}`}>Dubai, Qatar, Oman, Bahrain & Saudi Arabia</h2>
          </div>

          <div className={styles.buttonRightContainer}>
            <button className={styles.viewJobsButton} onClick={() => window.location.href = '/jobs'}> View Job </button>
          </div>

          <div className={styles.unionImageRightContainer}>
            <Image src="/Union (1).png" alt="Union Right Icon" width={6.25} height={10} />
          </div>

          <div className={styles.sliderLogoContainer}>
            <Image src="/sliderlogo.png" alt="Slider Logo" width={58} height={5} />
          </div>

          {/* Search bar and location dropdown */}
          <div className={styles.searchImageContainer}>
            <Image 
              src="/search.png" alt="Search Icon" width={24} height={24} className={styles.additionalSearchIcon} />
            <input type="text" placeholder="Search job title" className={styles.searchInput} value={searchTerm} onChange={handleSearchChange} />

            <div className={styles.locationContainer}>
              <Image src="/flag.png" alt="Flag Icon" width={24} height={24} className={styles.flagIcon} />
                 <select value={selectedLocation} onChange={handleLocationChange} className={styles.locationDropdown}>
                <option value="Dubai">Dubai</option>
                <option value="Oman">Oman</option>
                <option value="Qatar">Qatar</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
              </select> 
           </div>

            {/* Find Jobs button */}
            <button className={styles.findJobsButton} onClick={handleFindJobs}> Find Jobs </button>
          </div>
        </div>
      </Slider>

      {/* Job Listings */}
      <div className={styles.jobListingContainer}>
        <div className={styles.jobList}>
          <span className={styles.latestJobsTitle}>Latest Jobs</span>
          <span onClick={() => window.location.href = '/jobs-in-oman'}>Jobs in Oman</span>
          <span onClick={() => window.location.href = '/jobs-in-qatar'}>Jobs in Qatar</span>
          <span onClick={() => window.location.href = '/jobs-in-kuwait'}>Jobs in Kuwait</span>
          <span onClick={() => window.location.href = '/jobs-in-dubai'}>Jobs in Dubai</span>
          <span onClick={() => window.location.href = '/jobs-in-bahrain'}>Jobs in Bahrain</span>
        </div>
      </div>
    </div>
  );
};

export default JobSlider;
