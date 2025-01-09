import React from "react";
import Navbar from "@/components/common/NavbarHeader";
import { usePathname } from "next/navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div>
    
      <Navbar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
