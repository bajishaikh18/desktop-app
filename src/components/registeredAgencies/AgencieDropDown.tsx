import React, { useState } from "react";
import { StateDropdown, CityDropdown } from 'react-country-state-city';
import styles from './Agencies.module.scss';
import { useTranslations } from "next-intl";

const AgencyListing: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedCountry = "IN"; 
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const t = useTranslations("Search");

  const toggleDropdown = () => {
    if (selectedState === null) {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  const selectState = (stateValue: string) => {
    if (selectedState === stateValue) {
      setSelectedState(null);
      setSelectedCity(null);
      setIsDropdownOpen(false);
    } else {
      setSelectedState(stateValue);
      setIsDropdownOpen(false);
      setSelectedCity(null);
    }
  };

  const selectCity = (cityValue: string) => {
    setSelectedCity(cityValue);
    setIsDropdownOpen(false); 
    setSelectedState(null); 
  };

  return (
    <div className={styles.jobListingContainer}>
      <div className={styles.jobList}>
        <div className={styles.labelWithIcon} onClick={toggleDropdown}>
          <span>Select State & City</span>
          <img src="/Vector.png" alt="Dropdown Icon" className={styles.vectorIcon} />
        </div>

        {isDropdownOpen && selectedState === null && (
          <div className={styles.dropdownMenu}>
            <StateDropdown
              country={selectedCountry}
              value={selectedState}
              onChange={(val: string) => setSelectedState(val)}
            />
          </div>
        )}

        {selectedState && (
          <div className={styles.dropdownMenu}> 
            <StateDropdown
              country={selectedCountry}
              value={selectedState}
              onChange={(val: string) => setSelectedState(val)}
            />
            <CityDropdown
              country={selectedCountry}
              state={selectedState}
              value={selectedCity}
              onChange={(val: string) => setSelectedCity(val)}
            />
          </div>
        )}

        <span>Oman Agencies</span>
        <span>Qatar Agencies</span>
        <span>Kuwait Agencies</span>
        <span>Dubai Agencies</span>
        <span>Bahrain Agencies</span>
      </div>
    </div>
  );
};

export default AgencyListing;
