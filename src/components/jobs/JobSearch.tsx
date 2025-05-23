"use client";
import React, { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Select from "react-select";
import styles from "./Slider.module.scss";
import { useTranslations } from "next-intl";

import { COUNTRIES } from "@/helpers/constants";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { BsSearch } from "react-icons/bs";


interface JobSearchProps {
  onSearch: (term: string) => void;
  onCountryChange: (country: string) => void;
}

const JobSearch: React.FC<JobSearchProps> = ({ onSearch, onCountryChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const { isDesktop } = useReponsiveStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (option: any) => {
    setSelectedLocation(option.value);
  };

  const locationOptions = useMemo(()=>[{value:"",label:"All"},...Object.entries(COUNTRIES)
  .filter(([country]) => country != "in")
  .map(([country, data]) => ({
    value: country,
    label:isDesktop ? country === "ae" ? "UAE" : data.label : data.iso3Code ,
  }))],[isDesktop]);

  const handleFindJobs = async (e:FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    onCountryChange(selectedLocation);
  };

  const t = useTranslations("Search");

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      border: "none",
      fontSize: "14px",
      boxShadow: "none",
      "&:hover": {
        border: "none",
      },
      width: isDesktop ? "120px" : "90px",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#000",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: 0,
      position: "absolute",
      zIndex: 9999,
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
  };
  if (typeof document === "undefined") {
    return null;
  }
  return (
    <form onSubmit={handleFindJobs} className={styles.searchImageContainer}>
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
        {
          selectedLocation && <Image
          src={`flags/${selectedLocation}.svg`}
          alt={`${selectedLocation} Flag`}
          width={24}
          height={24}
          className={styles.flagIcon}
        />
        }
       

        <Select
          value={locationOptions.find(
            (option) => option.value === selectedLocation
          )}
          onChange={handleLocationChange}
          options={locationOptions}
          className={styles.locationDropdown}
          styles={customSelectStyles}
          menuPortalTarget={document?.body}
        />
      </div>

      <button type="submit" className={styles.findJobsButton} >
        {isDesktop ? t("find_Jobs") : <BsSearch />}
      </button>
    </form>
  );
};

export default JobSearch;
