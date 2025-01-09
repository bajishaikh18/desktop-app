"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
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
import { IMAGE_BASE_URL } from "@/helpers/constants";
import { Notifications } from "../notification/Notifications";
import { getUserNotifications } from "@/apis/notification";
import { Notification } from "@/stores/useNotificationStore";

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return {
    width:0,
    height: 0,
  };
}

const Header: React.FC = () => {
  const t = useTranslations("Header");
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const ref = useRef<any>(null);
  const [getDetails,setGetDetails]= useState(false);
  const { authUser, setAuthUser,setAuthUserLoading,openLogin,setOpenLogin } = useAuthUserStore();
  const {setIsDesktop} = useReponsiveStore();
  const pathname = usePathname();

  const { data,isLoading } = useQuery({
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

  const outsideClose = (e: any) => {
    let filterDiv = document.getElementById("notification-menu");
    if (
      filterDiv &&
      !filterDiv?.contains(e.target) &&
      ref?.current !== undefined
    ) {
      setShowNotification(false)
    }
  };

  useEffect(() => {
    if (windowDimensions.width) {
      setIsDesktop(isDesktop, isTab, isMobile);
    }
  }, [windowDimensions]);

  useEffect(() => {
    if (data) {
      setAuthUser(data.userDetails as AuthUser);
    }
  }, [data]);

  useEffect(()=>{
    setAuthUserLoading(isLoading);
  },[isLoading])

  useEffect(() => {
    if (isTokenValid() && !authUser) {
      setGetDetails(true);
    }
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", (e: any) => outsideClose(e));
    return () => {
       window.removeEventListener("resize", handleResize)
       document.removeEventListener("mousedown", (e: any) =>
        outsideClose(e)
       );
     };
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

  const [showNotification, setShowNotification] = useState(false);
  const [unReadCount, setUnReadCount] = useState(0);
  const [notifCount,setNotifCount] = useState(0);
  const isLoggedIn = isTokenValid();
  const {
    data: notifications,
    isLoading:isNotifLoading,
    error,
  } = useQuery<Notification[]>({
    queryKey: ["user-notifications", isLoggedIn],
    queryFn: async () => {
      if (isLoggedIn) {
        try {
          const data = await getUserNotifications();
          
          return data;
        } catch (err) {
         
          throw err;
        }
      }
      return null;
    },
    refetchInterval: 10000,
    retry: 1,
  });
 
    useEffect(()=>{
    if(notifications){
      const unread =notifications.filter(x=>!x.dismissed).length;
      setUnReadCount(unread)
      setNotifCount(notifications.length);
    }
  },[notifCount, notifications])

  return (
    <>
      <Navbar className={styles.header} expand="lg" fixed="top">
        <Image src="/logo.svg" alt="Logo" width={136} height={28} />
        <div className={styles.mobileMenu}>
        {
            !isDesktop && <LocaleSwitcherSelect />
          }
        {
            !isDesktop && 
            
              authUser ?  <div className={styles.authNav}>
              <div className={styles.divider}> |</div>
              <NavDropdown
                title={
                  <>
                    {authUser.profilePic ? (
                      <Image
                        src={`${IMAGE_BASE_URL}/${authUser.profilePic}?ts=${new Date().getTime()}`}
                        className={styles.profilePic}
                        width={32}
                        height={32}
                        alt=""
                      />
                    ) : (
                      <BiSolidUserCircle fontSize={32} color="#0045E6" />
                    )}
                  </>
                }
                align={"end"}
                drop="down-centered"
                className={styles.navListItem}
                style={{ paddingRight: 0 }}
              >
                <NavDropdown.ItemText className={styles.userName}>
                  {authUser.firstName || ""} {authUser.lastName || ""}
                </NavDropdown.ItemText>
                <NavDropdown.Item
            href="/settings"
          className={styles.navListItem}
        >
                    
                    Settings
                    </NavDropdown.Item>

                    <NavDropdown.Item
                    href="/userjobs"
                    className={styles.navListItem}
                     
                    > Jobs
                    
                    </NavDropdown.Item>
                    <NavDropdown.Item
                    href="/uploadCV"
                    className={styles.navListItem}
                     
                    >
                    Upload CV
                    </NavDropdown.Item>
                    <NavDropdown.Item
                    href="/uploadWorkVideo"
                    className={styles.navListItem}
                     
                    >
                    Upload Work Video
                    </NavDropdown.Item>
                    <NavDropdown.Item
                    href="javascript:;"
                    className={styles.navListItem}
                     
                    >
                    Need Help
                    </NavDropdown.Item>
                    <NavDropdown.Item
                    href="javascript:;"
                    className={styles.navListItem}
                     
                    >
                    Privacy Poilcy
                    </NavDropdown.Item>
                    <NavDropdown.Item
                    href="javascript:;"
                    className={styles.navListItem}
                     
                    >
                    Terms & Conditions
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
        
           <Navbar.Toggle aria-controls="basic-navbar-nav" children={
            <><HiMenuAlt1 fontSize={25}/> </>
          }/>
         
               
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.navContainer}>
            <Link
              className={`${styles.navListItem} ${
                pathname == "/" || pathname.includes("job") ? styles.active : ""
              }`}
              href="/"
            >
              {t("jobs")}
            </Link>

            <Link
              href="/walk-in"
              className={`${styles.navListItem} ${
                pathname.includes("walk-in") ? styles.active : ""
              }`}
            >
              {t("walkins")}
            </Link>

            <Link
              href="/agency"
              className={`${styles.navListItem} ${
                pathname.includes("agency") ? styles.active : ""
              }`}
            >
              {t("agenices")}
            </Link>
         
            <Link
              href="/trade"
              className={`${styles.navListItem} ${
                pathname.includes("trade") ? styles.active : ""
              }`}
            >
             {t("tradeTestCenter")}
            </Link>

            <Link className={styles.navListItem} href="javascript:;">
              {t("travel")}
            </Link>

            <Link
              href="/tutorial"
              className={`${styles.navListItem} ${
                pathname.includes("tutorial") ? styles.active : ""
              }`}
            >
            Tutorials
            </Link>

            <NavDropdown title={t("services")} className={styles.navListItem} drop="down">
              <NavDropdown.Item className={styles.navListItem}>
                {t("documentAttestation")}
              </NavDropdown.Item>
              <NavDropdown.Item className={styles.navListItem}>
                {t("medicalTests")}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className={styles.rightNavItems}>
            {authUser ? (
              <>
              
                <div className="d-none d-md-flex align-items-center">
                     
               <Nav.Link href="javascript:;" id='notification-menu' ref={ref} onClick={() => {setShowNotification(true)}} className={styles.notificationTrigger}>
              <Image src="/bell.png" alt="bell" width={16} height={19} />
              {!!unReadCount && <Badge className={styles.notificationBadge}>{unReadCount}</Badge>}
              {showNotification && <Notifications notifications={notifications} handleClose={() => {setShowNotification(false)}}  isLoading={isNotifLoading} error={error}/>}
            </Nav.Link>
                  <div className={styles.divider}> |</div>
               
                  <NavDropdown
                    title={`${authUser.firstName || ""} ${authUser.lastName || ""}`}
                    className={styles.navListItem}
                    style={{paddingRight:"20px"}}
                  >
                    
                    <NavDropdown.Item
            href="/settings"
          className={styles.navListItem}
        >
                    
                    {t('settings')}
                    </NavDropdown.Item>

                    <NavDropdown.Item
                    href="/userjobs"
                    className={styles.navListItem}
                     
                    > {t('user_jobs')}
                    
                    </NavDropdown.Item>
                    <NavDropdown.Item
                    href="/uploadCV"
                    className={styles.navListItem}
                     
                    >

                    {t('uploadCV')}

                    

                    </NavDropdown.Item>
                    <NavDropdown.Item
                    href="/uploadWorkVideo"
                    className={styles.navListItem}
                     
                    >

                    {t('uploadWorkVideo')}

                   

                    </NavDropdown.Item>
                    <NavDropdown.Item
                    href="javascript:;"
                    className={styles.navListItem}
                     
                    >
                    {t('needhelp')}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                    href="javascript:;"
                    className={styles.navListItem}
                     
                    >
                    {t('privacypoilcy')}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                    href="javascript:;"
                    className={styles.navListItem}
                     
                    >
                    {t('terms_conditions')}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="javascript:;"
                      className={styles.navListItem}
                      onClick={logout}
                    >
                      {t('logout')}
                    </NavDropdown.Item>
                  </NavDropdown>
                  {
                    authUser.profilePic ? <Image src={`${IMAGE_BASE_URL}/${authUser.profilePic}?ts=${new Date().getTime()}`} className={styles.profilePic} width={32} height={32} alt=""/> : <BiSolidUserCircle fontSize={32} color="#0045E6" />
                  }
                  
                </div>

               
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
                {isDesktop && (
                  <Nav.Link
                    className={`${styles.navListItem} ${styles.navListItemBlue}`}
                    href="javascript:;"
                    onClick={openPopup}
                  >
                    {" "}
                    {t("signIn")}
                  </Nav.Link>
                )}
              </>
            )}
            {isDesktop && <LocaleSwitcherSelect />}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <LoginPopup show={openLogin} onClose={closePopup} />
    </>
  );
};

export default Header;
