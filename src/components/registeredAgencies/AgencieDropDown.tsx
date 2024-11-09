import React, { useState, useEffect, useCallback } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import styles from "./Agencies.module.scss";
import { useTranslations } from "next-intl";
import Select, { components, GroupProps } from "react-select";
import { Accordion } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import AsyncSelect from "react-select/async";


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
  const [states, setStates] = useState<
    { id: string; name: string; state_code: string }[]
  >([]);
  const [options, setOptions] = useState<any>([]);
  const t = useTranslations("Search");

  useEffect(() => {
    const fetchStates = async () => {
      const statesList = await GetState(101);
      setStates(statesList);
    };
    fetchStates();
  }, []);

 const handleChange = (options:any) => {
    console.log(options);
  };
  
  useEffect(()=>{ 
    if(states && states.length>0){
      const optionsOfState = states.map(state=>({label:state.name,options:[{value:"",label:""}]}))
      setOptions(optionsOfState)
    }
  },[states])

  const loadOptions =  async (state:any) => {
      const isStateHaveData = options.find((x:any)=>x.label===state.name && x.options.length>1);
      if(isStateHaveData){
        return
      }
      const cities = await GetCity(101,state.id);
      const newOptions = options.map((x:any)=>{
        if(x.label===state.name){
          return {
            label : state.name,
            options : cities.map((city:any)=>{
                return {
                    value: city.name,
                    label: city.name
                }
            })
        }
        }else{
          return x;
        }
      });
     setOptions(newOptions);
   };

  const handleHeaderClick = async (id: any,label:string) => {
  
    const node = document?.querySelector(`#${id}`)?.parentElement
      ?.nextElementSibling;
    const classes = node?.classList;
    if (classes?.contains("collapsed-open")) {
      node?.classList.remove("collapsed-open");
    } else {
      const selectedState = states.find(s=>s.name===label);
      await loadOptions(selectedState);
      node?.classList.add("collapsed-open");
    }
  };


  const GroupHeading = (props: any) => {
    return (
      <div
        className="group-heading-wrapper"
        onClick={() => handleHeaderClick(props.id,props.data.label)}
      >
        <components.GroupHeading {...props}>
          <div className={styles.agencyStates}>
            <label>{props.data?.label}</label>
            {
              props.data?.isOpen ?   <FaChevronUp fontSize={12} />
              :    <FaChevronDown fontSize={12} />

            }
          </div>
        </components.GroupHeading>
      </div>
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={styles.jobListingContainer}>
      <div className={styles.jobList}>
        <div>
          <div className={styles.labelWithIcon} onClick={toggleDropdown}>
            <span>Select Country, State & City</span>
            {
              isDropdownOpen ?  <FaChevronUp fontSize={12} /> : <FaChevronDown fontSize={12} />
            }
           
          </div>

          {isDropdownOpen  && options.length > 0 && (
            <Select
              options={options}
              menuIsOpen={isDropdownOpen}
              isMulti={true}
              hideSelectedOptions={false}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "rgba(246, 241, 255, 1)",
                  primary: "#0045E6",
                },
              })}
              onChange={handleChange}
              components={{
                GroupHeading,
              }}
              styles={{
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  borderBottom: "1px solid rgba(217, 217, 217, 1)",
                  padding: "12px 16px",
                }),
                control: (baseStyles, state) => ({
                  display: "none",
                }),
                menuList: (baseStyles, state) => ({
                  ...baseStyles,
                  padding: "0px",
                  fontSize: "14px",
                  textAlign: "left",

                  color: "rgba(0, 0, 0, 1)",
                  background: "rgba(250, 248, 255, 1)",
                }),
                group: (base, props) => ({
                  ...base,
                  padding: "0px",
                }),
                groupHeading: (baseStyles, state) => ({
                  ...baseStyles,
                  textAlign: "left",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  padding: "15px 16px",
                  marginBottom: "0px",
                  background: "#fff",
                  color: "#000",
                  borderBottom: "1px solid rgba(217, 217, 217, 1)",
                }),
              }}
            />
          )}
        </div>
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
