import React, { useState } from "react";
import styles from './Agencies.module.scss';
import { useTranslations } from "next-intl";


type CityOption = { value: string; label: string; };
type StateOption = { value: string; label: string; cities: CityOption[]; };

const stateOptions: StateOption[] = [
    { value: 'ap', label: 'Andhra Pradesh', cities: [{ value: 'visakhapatnam', label: 'Visakhapatnam' }, { value: 'vijayawada', label: 'Vijayawada' }, { value: 'Guntur', label: 'Guntur' }, { value: 'Kakinada', label: 'Kakinada' }, { value: 'Kadapa', label: 'Kadapa' }, { value: 'Rajahmundry', label: 'Rajahmundry' }] },
    { value: 'arunachal', label: 'Arunachal Pradesh', cities: [{ value: 'itanagar', label: 'Itanagar' }, { value: 'tawang', label: 'Tawang' }] },
    { value: 'assam', label: 'Assam', cities: [{ value: 'guwahati', label: 'Guwahati' }, { value: 'jorhat', label: 'Jorhat' }] },
    { value: 'bihar', label: 'Bihar', cities: [{ value: 'patna', label: 'Patna' }, { value: 'gaya', label: 'Gaya' }] },
    { value: 'goa', label: 'Goa', cities: [{ value: 'panaji', label: 'Panaji' }, { value: 'margao', label: 'Margao' }] },
    { value: 'gujarat', label: 'Gujarat', cities: [{ value: 'ahmedabad', label: 'Ahmedabad' }, { value: 'surat', label: 'Surat' }] },
    { value: 'chatisgarh', label: 'Chatisgarh', cities: [{ value: 'raipur', label: 'Raipur' }, { value: 'bilaspur', label: 'Bilaspur' }] },
   
];

const AgencyListing: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [expandedState, setExpandedState] = useState<string | null>(null); 
    const t = useTranslations("Search");

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const selectState = (stateValue: string) => {
        if (selectedState === stateValue) {
           
            setSelectedState(null);
            setExpandedState(null);
        } else {
           
            setSelectedState(stateValue);
            setExpandedState(stateValue);
        }
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
                        
                        {stateOptions
                            .filter(state => state.value === selectedState || selectedState === null) 
                            .map((state) => (
                                <div key={state.value} className={styles.stateItem}>
                                    <div className={styles.stateLabel} onClick={() => selectState(state.value)}>
                                        {state.label}
                                        <img
                                            src={selectedState === state.value ? "/downarrow.png" : "/chevron-left.png"}
                                            alt="Toggle"
                                            className={styles.arrow}
                                        />
                                    </div>

                                   
                                    {expandedState === state.value && (
                                        <div className={styles.cityDropDown}>
                                            {state.cities.map((city) => (
                                                <div key={city.value} className={styles.cityItem}>
                                                    {city.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
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
