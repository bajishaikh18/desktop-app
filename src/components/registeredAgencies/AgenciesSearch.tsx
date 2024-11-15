"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from './Agencies.module.scss';
import { useTranslations } from "next-intl";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { BsSearch } from "react-icons/bs";
import AgencyDropDown from "@/components/registeredAgencies/AgencieDropDown";
import { Container } from "react-bootstrap";
import AgencyPortal from "@/components/registeredAgencies/AgenciesPortal";

const AgenciesSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("ae");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const { isDesktop } = useReponsiveStore();
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFindAgencies = async () => {
    setSearchText(searchTerm);
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

      <AgencyPortal selectedCities={selectedCities} searchText={searchText} />
    </Container>
  );
};

export default AgenciesSearch;
