import React from "react";
import TutorialNavbar from "@/components/common/TutorialNavbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
