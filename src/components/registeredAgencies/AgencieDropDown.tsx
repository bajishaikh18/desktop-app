import React, { useState, useEffect } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import styles from './Agencies.module.scss';
import { useTranslations } from "next-intl";


interface Country {
    isoCode: string;
    name: string;
}

interface State {
    isoCode: string;
    name: string;
}

interface City {
    name: string;
}

const AgencyListing: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [countries, setCountries] = useState<Country[]>([]); 
    const [states, setStates] = useState<State[]>([]); 
    const [cities, setCities] = useState<City[]>([]); 
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const t = useTranslations("Search");


    useEffect(() => {
        const fetchCountries = async () => {
            const countriesList = await GetCountries();
            const indiaCountry = countriesList.find((country) => country.name === "India");
            if (indiaCountry) {
                setCountries([indiaCountry]); 
            }
        };
        fetchCountries();
    }, []);

  
    useEffect(() => {
        const fetchStates = async () => {
            if (selectedCountry === "IN") {  
                const statesList = await GetState("IN");
                setStates(statesList);
            } else {
                setStates([]);
            }
        };
        fetchStates();
    }, [selectedCountry]);

  
    useEffect(() => {
        const fetchCities = async () => {
            if (selectedState) {
                const citiesList = await GetCity(selectedState);
                setCities(citiesList);
            } else {
                setCities([]);
            }
        };
        fetchCities();
    }, [selectedState]);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const selectCountry = (countryCode: string) => {
        setSelectedCountry(countryCode);
        setSelectedState(null);
        setSelectedCity(null);
        setCities([]);
    };

    const selectState = (stateCode: string) => {
        setSelectedState(stateCode);
        setSelectedCity(null);
    };

    return (
        <div className={styles.jobListingContainer}>
            <div className={styles.jobList}>
                <div className={styles.labelWithIcon} onClick={toggleDropdown}>
                    <span>Select State & City</span>
                    <img src="/Vector.png" alt="Dropdown Icon" className={styles.vectorIcon} />
                </div>

                {isDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                       
                        <select
                            value={selectedCountry || ""}
                            onChange={(e) => selectCountry(e.target.value)}
                            className={styles.dropdown}
                        >
                            <option value="">Select Country</option>
                            {countries.map((country: Country) => ( 
                                <option key={country.isoCode} value={country.isoCode}>
                                    {country.name}
                                </option>
                            ))}
                        </select>

                       
                        {selectedCountry === "IN" && (
                            <select
                                value={selectedState || ""}
                                onChange={(e) => selectState(e.target.value)}
                                className={styles.dropdown}
                            >
                                <option value="">Select State</option>
                                {states.map((state: State) => ( 
                                    <option key={state.isoCode} value={state.isoCode}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        )}

                       
                        {selectedState && (
                            <select
                                value={selectedCity || ""}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className={styles.dropdown}
                            >
                                <option value="">Select City</option>
                                {cities.map((city: City) => (  
                                    <option key={city.name} value={city.name}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        )}
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
