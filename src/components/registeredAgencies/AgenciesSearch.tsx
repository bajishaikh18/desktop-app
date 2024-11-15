"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from './Agencies.module.scss';
import { useTranslations } from "next-intl";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { BsSearch } from "react-icons/bs";
import AgencyDropDown from "@/components/registeredAgencies/AgencieDropDown";
import { Container } from "react-bootstrap";
import AgenciesPortal from "@/components/registeredAgencies/AgenciesPortal";


interface AgencieSearchProps {
  onSearch: (term: string) => void;
  onCountryChange: (country: string) => void;
}

const AgencieSearch: React.FC<AgencieSearchProps> = ({ onSearch, onCountryChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("ae");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const { isDesktop } = useReponsiveStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFindAgencies = async () => {
    onSearch(searchTerm);
    onCountryChange(selectedLocation);
  };

  const t = useTranslations("AgencySearch");

  return (
    <Container fluid className={styles.agenciesSearchContainer}>
      <section className={styles.agenciesSearchBox}>

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
            placeholder={t("search_agency")}
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles.locationContainer}>
          
        </div>
        <button className={styles.findJobsButton} onClick={handleFindAgencies}>
          {isDesktop ? t("find_agencies") : <BsSearch />}
        </button>
      </div>
      
      <AgencyDropDown onCitiesChange={setSelectedCities} /> 
      </section>

      <AgenciesPortal selectedCities={selectedCities} />
    </Container>
  );
};

export default AgencieSearch;
