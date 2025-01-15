import React from 'react';
import styles from './TutorialNavbar.module.scss';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
const TutorialNavbar = () => {
    const pathname = usePathname();
  const t = useTranslations("Tutorials");
  return (
    <div className={styles.navbar}>
     <Link
            href="/tutorial"
            className={`${styles.navListItem} ${pathname.includes('tutorial') ? styles.active : ''}`}
        
          >
            {t('video_tutorials')}
          </Link>

      <Link
        href="/article"
        className={`${styles.navListItem} ${pathname.includes('article') ? styles.active : ''}`}
      >
        {t('articles')}
      </Link>

     
    </div>
  );
};

export default TutorialNavbar;