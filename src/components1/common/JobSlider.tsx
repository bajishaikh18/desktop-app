import React from 'react';
import Image from 'next/image'; 
import styles from './Slider.module.scss'; 
import Slider from 'react-slick';


const JobSlider: React.FC = () => {
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
  return (
    
    <div className={styles.sliderContainer}>
       <Slider {...settings}>
        <div>
       <Image 
        src="/slider.png"   alt="Slider Image" 
        layout="responsive" 
        width={1440}   height={190}   />
        <div className={styles.unionImageContainer}>
        <Image src="/Union.png" alt="Union Icon"  width={6.25} height={10} />
      </div>
      <div className={styles.overlay}>
        <h1 className={`${styles.textCommon} ${styles.title}`}>Apply International Job Openings across</h1>
        <h2 className={`${styles.textCommon} ${styles.subtitle}`}>Dubai, Qatar, Oman, Bahrain & Saudi Arabia</h2>
      </div>
      <div className={styles.buttonRightContainer}>
        <button className={styles.viewJobsButton}>View Jobs</button>
      </div>
      <div className={styles.unionImageRightContainer}>
        <Image src="/Union (1).png" alt="Union Right Icon" width={6.25} height={10} />
        </div>
        <div className={styles.sliderLogoContainer}>
        <Image src="/sliderlogo.png" alt="Slider Logo" width={58} height={5}   />
      </div>
      

  <div className={styles.searchImageContainer}>
   <Image 
    src="/search.png"  alt="Search Icon" width={24}  height={24} className={styles.additionalSearchIcon}  />
 <input  type="text" placeholder="Search job title" className={styles.searchInput} />
   <div className={styles.locationContainer}>
    <Image 
    src="/flag.png"  alt="Flag Icon"  width={24} height={24} className={styles.flagIcon} />
   <span className={styles.locationText}>Dubai</span>
   <Image src="/Vector 2.png"  alt="Vector Icon" width={10} height={5.4} className={styles.vectorIcon} />
</div>
{/* Find Jobs button */}
  <button className={styles.findJobsButton}>Find Jobs</button>
</div>
</div>
   </Slider>
   
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
