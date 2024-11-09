"use client";
import Agenciesportal from "@/components/registeredAgencies/AgenciesPortal";
import AgencieSearch from "@/components/registeredAgencies/AgenciesSearch";
const AgencyPage: React.FC = () => {
  return (
    <div>
       <AgencieSearch/>
     <Agenciesportal />  
    
     
    </div>
  );
};

export default AgencyPage;