"use client"; 
import React, { useState } from 'react';
import Image from 'next/image';
import Select from 'react-select'; 
import styles from './Slider.module.scss';
import { useTranslations } from 'next-intl';
import { getJobs } from "@/apis/jobs";
import { COUNTRIES } from '@/helpers/constants';



const locationOptions = Object.entries(COUNTRIES).filter(([country])=>country!="in").map(([country,data])=>({value:country,label:country==="ae" ? "UAE" :data.label}))

interface JobSearchProps {
  onSearch?: (jobs: any[]) => void; 
}

const JobSearch: React.FC<JobSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('ae'); 

 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

 
  const handleLocationChange = (option: any) => {
    setSelectedLocation(option.value);
  };

  
  const handleFindJobs = async () => {
    try {
      const jobs = await getJobs(1, 10, searchTerm, 'jobTitle');
      if (onSearch) {
        onSearch(jobs); 
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const t = useTranslations("Search"); 

 
  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      border: 'none',
      fontSize:"14px",
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
      },
      width:"120px"
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
      <div className={styles.searchBox}>
      <Image
        src="/icons/search.svg"
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

</div>
      <div className={styles.locationContainer}>
        <span className={styles.separator}></span> 
        
        <Image
          src={`flags/${selectedLocation}.svg`} 
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
