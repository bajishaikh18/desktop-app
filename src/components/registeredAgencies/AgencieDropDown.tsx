import React, { useState, useEffect, useCallback, useRef } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import styles from "./Agencies.module.scss";
import { useTranslations } from "next-intl";
import Select, { components, GroupProps } from "react-select";
import { Accordion, Container } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import AsyncSelect from "react-select/async";
import { IoClose } from "react-icons/io5";


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

const AgencyDropDown: React.FC<{ onCitiesChange: (cities: string[]) => void }> = ({ onCitiesChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [states, setStates] = useState<
    { id: string; name: string; state_code: string }[]
  >([]);
  const [options, setOptions] = useState<any>([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const t = useTranslations("Agencydropdown");
  const selectRef = useRef(null)

  const outsideClose = (e: any) => {
    let filterDiv = document.getElementById("select-container");
    if (
      filterDiv &&
      !filterDiv?.contains(e.target) &&
      selectRef?.current !== undefined
    ) {
        setIsDropdownOpen(false)
    }
  };

  useEffect(() => {
    const fetchStates = async () => {
      const statesList = await GetState(101);
      setStates(statesList);
    };
    fetchStates();
    document.addEventListener("mousedown", (e: any) => outsideClose(e));
    return () => {
       document.removeEventListener("mousedown", (e: any) =>
        outsideClose(e)
       );
     };
  }, []);


  const handleChange = (options: any) => {
    setSelectedCities(options);
    onCitiesChange(options.map((city: any) => city.value));
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


  const removeCity = (cityVal:string)=>{
    const modifiedCities = selectedCities.filter((city:any)=>city.value != cityVal);
    setSelectedCities(modifiedCities);
  }

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
    <Container>
    <div className={styles.jobListingContainer}>
      <div className={styles.jobList}>
        <div className={styles.dropdownContainer}  id="select-container">
          <div className={styles.labelWithIcon} onClick={toggleDropdown}>
            
            <span style={{color:isDropdownOpen ? "#0045E6" : "#000"}}>{t('select')}</span>
            {
              isDropdownOpen ?  <FaChevronUp fontSize={12} color="#0045E6" /> : <FaChevronDown fontSize={12} />
            }
           
          </div>
          <div className={styles.selectContainer}>
          {isDropdownOpen  && options.length > 0 && (
            <Select
              options={options}
              ref={selectRef}
              menuIsOpen={isDropdownOpen}
              isMulti={true}
              hideSelectedOptions={false}
              value={selectedCities}
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
        </div>
        <div className={styles.selectedCities}>
          {
            selectedCities.length > 0 ?
            
            selectedCities.map((city:any,i:number)=>(
             
              <>
               {
                i< 5 && <div className={styles.tag}>{city.label} <IoClose fontSize={15} fontWeight={700} className={styles.close} onClick={()=>removeCity(city.value)}/></div>

              }
              </>
            )) : <p className={styles.allCities}>{t('showing')}</p>
          }{
            selectedCities.length > 5 && <span className={styles.moreCities}>+ {selectedCities.length-5} More</span>
          }
        </div>
      </div>
    </div>
    </Container>
  );
};

export default AgencyDropDown;
