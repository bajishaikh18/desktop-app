"use client";
import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Header.module.scss";
import { useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./locale/LocaleSwitcherSelect";
import LoginPopup from "../auth/Loginpopup";

import { AuthUser, useAuthUserStore } from "@/stores/useAuthUserStore";
import { isTokenValid } from "@/helpers/jwt";
import Image from "next/image";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { getUserDetails } from "@/apis/auth";
import { useQuery } from "@tanstack/react-query";
import { HiMenuAlt1 } from "react-icons/hi";
import { BiSolidUserCircle } from "react-icons/bi";
import Link from 'next/link';
import { usePathname } from "next/navigation";
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Header: React.FC = () => {
  const t = useTranslations("Header");
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [getDetails,setGetDetails]= useState(false);
  const { authUser, setAuthUser,openLogin,setOpenLogin } = useAuthUserStore();
  const {setIsDesktop} = useReponsiveStore();
  const pathname = usePathname();

  const { data } = useQuery({
    queryKey: ["userDetail",getDetails],
    queryFn: () => {
      if (getDetails) {
        return getUserDetails();
      }
      throw new Error("jobId is null or undefined");
    },
    enabled: true,
  });
  
  
  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }
  const isDesktop = windowDimensions.width > 1024;
  const isTab = windowDimensions.width >= 768 && windowDimensions.width < 1024;
  const isMobile = windowDimensions.width < 768;

  useEffect(()=>{
    if(windowDimensions.width){
      setIsDesktop(isDesktop,isTab,isMobile)
    }
  },[windowDimensions])

  useEffect(()=>{
    if(data){
      setAuthUser(data.userDetails as AuthUser)
    }
  },[data])

  useEffect(() => {
    if (isTokenValid() && !authUser) {
      setGetDetails(true);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openPopup = () => {
    setOpenLogin(true);
  };

  const closePopup = () => {
    setOpenLogin(false);
  };

  const logout = () => {
    localStorage.clear();
    location.reload();
    setAuthUser(null);
  };

  return (
    <>
      <Navbar className={styles.header} expand="lg" fixed="top">
        <Image src="/logo.svg" alt="Logo" width={136} height={28} />
        <div className={styles.mobileMenu}>
        {
            !isDesktop && 
            
              authUser ?  <div className={styles.authNav}>
              <div className={styles.divider}> |</div>
             
              <NavDropdown
                title={<> {
                  authUser.profilePic ? <Image src={authUser.profilePic} width={32} height={32} alt=""/> : <BiSolidUserCircle fontSize={32} color="#0045E6" />
                }</>}
                align={"end"}
                drop="down-centered"
                className={styles.navListItem}
                style={{paddingRight:0}}
              >
                <NavDropdown.ItemText className={styles.userName}>{authUser.firstName || ""} {authUser.lastName || ""}</NavDropdown.ItemText>
                <NavDropdown.Item
                href="javascript:;"
                className={styles.navListItem}
                  onClick={logout}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                href="javascript:;"
                className={styles.navListItem}
                  onClick={logout}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
             
              
            </div>:<Nav.Link
            className={`${styles.navListItem} ${styles.navListItemBlue}`}
            onClick={openPopup}
          >{t("signIn")}</Nav.Link>

            
          }
         {
            !isDesktop && <LocaleSwitcherSelect />
          }
           <Navbar.Toggle aria-controls="basic-navbar-nav" children={
            <><HiMenuAlt1 fontSize={25}/> </>
          }/>
         
               
        </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles.navContainer}>
              <Link
                className={`${styles.navListItem} ${
                  pathname == "/" || pathname.includes('job') ? styles.active : ""
                }`}
                href="/"
              >
                {t("jobs")}
              </Link>
              
              <Link href="/walk-in"  className={`${styles.navListItem} ${
                  pathname.includes('walk-in') ? styles.active : ""
                }`}>
             {t("walkins")}
               </Link> 
             
               <Link href="/agency"  className={`${styles.navListItem} ${
                  pathname.includes('agency') ? styles.active : ""
                }`}>
                {t("agenices")}
              </Link>

              <Link className={styles.navListItem}                     href="javascript:;"
              >
                {t("travel")}
              </Link>
              <NavDropdown title={t("services")} className={styles.navListItem} drop="down">
                <NavDropdown.Item
                  className={styles.navListItem}
                >
                  {t("documentAttestation")}
                </NavDropdown.Item>
                <NavDropdown.Item
                  className={styles.navListItem}
                >
                  {t("medicalTests")}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className={styles.rightNavItems}>
              {authUser ? (
                <div className="d-none d-md-flex align-items-center">
                  <div className={styles.divider}> |</div>
                  <NavDropdown
                    title={`${authUser.firstName || ""} ${authUser.lastName || ""}`}
                    className={styles.navListItem}
                    style={{paddingRight:0}}
                  >
                    <NavDropdown.Item
                    href="javascript:;"
                    className={styles.navListItem}
                      onClick={logout}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  {
                    authUser.profilePic ? <Image src={authUser.profilePic} width={32} height={32} alt=""/> : <BiSolidUserCircle fontSize={32} color="#0045E6" />
                  }
                  
                </div>
              ) : (
                <>
                  <Nav.Link
                    className={`${styles.navListItem} ${styles.navListItemBlue}`}
                    href="javascript:;"
                  >
                    {t("employer")}
                  </Nav.Link>
                  <div className={styles.divider}> |</div>
                  {
                    isDesktop &&  <Nav.Link
                    className={`${styles.navListItem} ${styles.navListItemBlue}`}
                    href="javascript:;"
                    onClick={openPopup}
                  >
                    {" "}
                    {t("signIn")}
                  </Nav.Link>
                  }
                 
                </>
              )}
              {
                isDesktop && <LocaleSwitcherSelect />
              }
              
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      <LoginPopup show={openLogin} onClose={closePopup} />
    </>
  );
};

export default Header;
