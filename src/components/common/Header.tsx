"use client";
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import styles from "./Header.module.scss";
import { useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './locale/LocaleSwitcherSelect';
import LoginPopup from '../auth/Loginpopup';


import { AuthUser, useAuthUserStore } from '@/stores/useAuthUserStore';
import { getTokenClaims, isTokenValid } from '@/helpers/jwt';

const Header: React.FC = () => {
  const t = useTranslations("Header");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const { authUser,setAuthUser } = useAuthUserStore();
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(()=>{
    if(isTokenValid() && !authUser){
      const token = localStorage.getItem('token');
      const user = getTokenClaims(token!);
      setAuthUser(user as AuthUser)
    }
  },[])

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };


  const logout = ()=>{
    localStorage.clear();
    setAuthUser(null);
  }


  return (
    <>
      <Navbar className={styles.header} expand="lg">
        <img src="./logo.png" className={styles.logo} alt="Logo" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.navContainer}>
            <Nav.Link className={styles.navListItem} href="#dashboard" style={{ color: 'blue' }}>{t('jobs')}</Nav.Link>
            <Nav.Link className={styles.navListItem} href="#posted-jobs">{t('walkins')}</Nav.Link>
            <Nav.Link className={styles.navListItem} href="#agencies">{t('agenices')}</Nav.Link>
            <Nav.Link className={styles.navListItem} href="#candidates">{t('travel')}</Nav.Link>
            <NavDropdown title={t('services')} className={styles.navListItem}>
              <NavDropdown.Item href="#action/3.1" className={styles.navListItem}>{t('documentAttestation')}</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className={styles.navListItem}>
               {t('medicalTests')}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className={styles.rightNavItems}>
            {
              authUser ? 
              <>
              <div className={styles.divider}> |</div>
              <NavDropdown title={authUser.email} className={styles.navListItem}>
              <NavDropdown.Item href="#action/3.2" className={styles.navListItem} onClick={logout}>
               Logout
              </NavDropdown.Item>
            </NavDropdown></>
              : <><Nav.Link className={`${styles.navListItem} ${styles.navListItemBlue}`} href="#employers">{t('employer')}
              </Nav.Link>
              <div className={styles.divider}> |</div>
              <Nav.Link className={`${styles.navListItem} ${styles.navListItemBlue}`} href="#employers" onClick={openPopup}> {t('signIn')}</Nav.Link></>
            }
            <LocaleSwitcherSelect />
          </Nav>
        </Navbar.Collapse>
      </Navbar>

     

      
      {/* Render the LoginPopup component */}
      <LoginPopup show={popupVisible} onClose={closePopup} />
    </>
  );
};

export default Header;
