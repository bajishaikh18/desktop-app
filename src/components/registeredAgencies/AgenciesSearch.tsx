"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from './Agencies.module.scss';
import { useTranslations } from "next-intl";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { BsSearch } from "react-icons/bs";
import AgencyDropDown from "@/components/registeredAgencies/AgencieDropDown";
import { Container } from "react-bootstrap";

interface AgencieSearchProps {
  onSearch: (term: string) => void;
  onCountryChange: (country: string) => void;
}

const AgencieSearch: React.FC<AgencieSearchProps> = ({ onSearch, onCountryChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("ae");
  const { isDesktop } = useReponsiveStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFindAgencies = async () => {
    onSearch(searchTerm);
    onCountryChange(selectedLocation);
  };

  const t = useTranslations("Search");

  return (
    <Container>
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
            placeholder={("search Agency")}
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles.locationContainer}>
          
        </div>
        <button className={styles.findJobsButton} onClick={handleFindAgencies}>
          {isDesktop ? ("Find Agencies") : <BsSearch />}
        </button>
      </div>
      
      <AgencyDropDown />
    </Container>
  );
};

export default AgencieSearch;
