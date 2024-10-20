"use client";
import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Header.module.scss";
import { useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./locale/LocaleSwitcherSelect";
import LoginPopup from "../auth/Loginpopup";

import { AuthUser, useAuthUserStore } from "@/stores/useAuthUserStore";
import { getTokenClaims, isTokenValid } from "@/helpers/jwt";
import Image from "next/image";
import { useReponsiveStore } from "@/stores/useResponsiveStore";
import { getUserDetails } from "@/apis/auth";
import { useQuery } from "@tanstack/react-query";
import { HiMenuAlt1 } from "react-icons/hi";

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
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [getDetails,setGetDetails]= useState(false);
  const { authUser, setAuthUser,openLogin,setOpenLogin } = useAuthUserStore();
  const {setIsDesktop} = useReponsiveStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userDetail",getDetails],
    queryFn: () => {
      if (getDetails) {
        return getUserDetails();
      }
      throw new Error("jobId is null or undefined");
    },
    enabled: true,
  });
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

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


  const getUser =async ()=>{
  }

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
    setAuthUser(null);
  };

  return (
    <>
      <Navbar className={styles.header} expand="lg" fixed="top">
        <Image src="/logo.svg" alt="Logo" width={136} height={28} />
        <div className={styles.mobileMenu}>
        {
            !isDesktop && <Nav.Link
            className={`${styles.navListItem} ${styles.navListItemBlue}`}
            href="#employers"
            onClick={openPopup}
          >
            {" "}
            {t("signIn")}
          </Nav.Link>
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
              <Nav.Link
                className={styles.navListItem}
                href="#dashboard"
                style={{ color: "blue" }}
              >
                {t("jobs")}
              </Nav.Link>
              <Nav.Link className={styles.navListItem}                     href="javascript:;"
              >
                {t("walkins")}
              </Nav.Link>
              <Nav.Link className={styles.navListItem}                     href="javascript:;"
              >
                {t("agenices")}
              </Nav.Link>
              <Nav.Link className={styles.navListItem}                     href="javascript:;"
              >
                {t("travel")}
              </Nav.Link>
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
                <>
                  <div className={styles.divider}> |</div>
                  <NavDropdown
                    title={authUser.email}
                    className={styles.navListItem}
                  >
                    <NavDropdown.Item
                    href="javascript:;"
                    className={styles.navListItem}
                      onClick={logout}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
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
      {/* <Navbar fixed="bottom">
      <Nav className={styles.navContainer}>
              <Nav.Link
                className={styles.navListItem}
                href="#dashboard"
                style={{ color: "blue" }}
              >
                {t("jobs")}
              </Nav.Link>
              <Nav.Link className={styles.navListItem} href="#posted-jobs">
                {t("walkins")}
              </Nav.Link>
              <Nav.Link className={styles.navListItem} href="#agencies">
                {t("agenices")}
              </Nav.Link>
              <Nav.Link className={styles.navListItem} href="#candidates">
                {t("travel")}
              </Nav.Link>
            </Nav>
      </Navbar> */}

      {/* Render the LoginPopup component */}
      <LoginPopup show={openLogin} onClose={closePopup} />
    </>
  );
};

export default Header;
