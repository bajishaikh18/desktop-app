import React from 'react';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();

  return (
    <div className={styles.navbar}>
     <Link
            href="/tutorial"
            className={`${styles.navListItem} ${pathname.includes('tutorial') ? styles.active : ''}`}
        
          >
            Video Tutorials
          </Link>

      <Link
        href="/article"
        className={`${styles.navListItem} ${pathname.includes('article') ? styles.active : ''}`}
      >
        Articles
      </Link>

     
    </div>
  );
};

export default Navbar;