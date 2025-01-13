import React from "react";
import TutorialNavbar from "@/components/common/TutorialNavbar";



import { usePathname } from "next/navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div>
    
      <TutorialNavbar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
