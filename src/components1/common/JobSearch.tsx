"use client"; 
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Slider.module.scss';

// Flag images mapping
const flagImages: { [key: string]: string } = {
  Dubai: '/flag.png',                             // Dubai flag
  Oman: '/oman-flag.jpg',                        // Path to Oman flag image
  Qatar: '/qatar.jpg',                            // Path to Qatar flag image
  Kuwait: '/kuwait.jpg',                          // Path to Kuwait flag image
  Bahrain: '/bahrain-flag.jpg',                  // Path to Bahrain flag image
  'Saudi Arabia': '/saudi-arabia.jpg',          // Path to Saudi Arabia flag image
};

interface JobSearchProps {
  onSearch: (searchTerm: string, selectedLocation: string) => void; // Callback for search
}

const JobSearch: React.FC<JobSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('Dubai');

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle location dropdown change
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };

  // Submit search query
  const handleFindJobs = () => {
    onSearch(searchTerm, selectedLocation);
  };

  return (
    <div className={styles.searchImageContainer}>
      <Image
        src="/search.png"
        alt="Search Icon"
        width={24}
        height={24}
        className={styles.additionalSearchIcon}
      />
      <input
        type="text"
        placeholder="Search job title"
        className={styles.searchInput}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className={styles.locationContainer}>
        <Image
          src={flagImages[selectedLocation]} // Dynamically change the flag based on selected location
          alt={`${selectedLocation} Flag`}
          width={24}
          height={24}
          className={styles.flagIcon}
        />
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          className={styles.locationDropdown}
        >
          <option value="Dubai">Dubai</option>
          <option value="Oman">Oman</option>
          <option value="Qatar">Qatar</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
        </select>
      </div>
      <button className={styles.findJobsButton} onClick={handleFindJobs}>
        Find Jobs
      </button>
    </div>
  );
};

export default JobSearch;
