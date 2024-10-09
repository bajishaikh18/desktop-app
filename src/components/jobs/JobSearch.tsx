"use client"; 
import React, { useState } from 'react';
import Image from 'next/image';
import Select from 'react-select'; 
import styles from './Slider.module.scss';
import { useTranslations } from 'next-intl';

// Flag images mapping
const flagImages: { [key: string]: string } = {
  Dubai: '/flag.png',                             
  Oman: '/oman-flag.jpg',                       
  Qatar: '/qatar.jpg',                           
  Kuwait: '/kuwait.jpg',                          
  Bahrain: '/bahrain-flag.jpg',                  
  'Saudi Arabia': '/saudi-arabia.jpg',        
};

const locationOptions = [
  { value: 'Dubai', label: 'Dubai' },
  { value: 'Oman', label: 'Oman' },
  { value: 'Qatar', label: 'Qatar' },
  { value: 'Kuwait', label: 'Kuwait' },
  { value: 'Bahrain', label: 'Bahrain' },
  { value: 'Saudi Arabia', label: 'Saudi Arabia' }
];

interface JobSearchProps {
  onSearch: (searchTerm: string, selectedLocation: string) => void; 
}

const JobSearch: React.FC<JobSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('Dubai');

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (option: any) => {
    setSelectedLocation(option.value);
  };

  const handleFindJobs = () => {
    onSearch(searchTerm, selectedLocation);
  };

  const t = useTranslations("Search");

 
  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#000',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: 0,
      position: 'absolute', 
      zIndex: 9999,         
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999,          
    }),
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
        placeholder={t("search_job_title")}
        className={styles.searchInput}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className={styles.locationContainer}>
        <span className={styles.separator}></span> 
        
        <Image
          src={flagImages[selectedLocation]} 
          alt={`${selectedLocation} Flag`}
          width={24}
          height={24}
          className={styles.flagIcon}
        />
        
        <Select
  value={locationOptions.find(option => option.value === selectedLocation)}
  onChange={handleLocationChange}
  options={locationOptions}
  className={styles.locationDropdown}
  styles={customSelectStyles}
  menuPortalTarget={document.body}  
/>

      </div>

      <button className={styles.findJobsButton} onClick={handleFindJobs}>
        {t('find_Jobs')}
      </button>
    </div>
  );
};

export default JobSearch;
