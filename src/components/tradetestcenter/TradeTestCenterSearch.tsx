"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from './TradeTestCenters.module.scss';
import { useTranslations } from "next-intl";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { BsSearch } from "react-icons/bs";
import TradeTestCenterPortal from "./TradeTestCenterPortal";
import { Container } from "react-bootstrap";
import TradesDropDown from "./TradesDropdown";

const TradeTestCentersSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const { isDesktop } = useReponsiveStore();
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFindCenters = async () => {
    setSearchText(searchTerm);
  };

  const t = useTranslations("TradeSearch");

  return (
    <Container fluid className={styles.tradeSearchContainer}>
      <section className={styles.tradeSearchBox}>

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
              placeholder={t("search_trade")}
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className={styles.locationContainer}></div>
          <button className={styles.findJobsButton} onClick={handleFindCenters}>
            {isDesktop ? t("find_trades") : <BsSearch />}
          </button>
        </div>
        <TradesDropDown onCitiesChange={setSelectedCities} /> 
      </section>
      <TradeTestCenterPortal selectedCities={selectedCities} searchText={searchText} />
    </Container>
  );
};

export default TradeTestCentersSearch;
