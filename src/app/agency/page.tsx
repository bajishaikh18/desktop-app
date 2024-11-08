"use client";
import Agenciesportal from "@/components/registeredAgencies/Agenciesportal";
import AgencieSearch from "@/components/registeredAgencies/AgencieSearch";
const AgencyPage: React.FC = () => {
  return (
    <div>
       <AgencieSearch/>
     <Agenciesportal />  
    
     
    </div>
  );
};

export default AgencyPage;