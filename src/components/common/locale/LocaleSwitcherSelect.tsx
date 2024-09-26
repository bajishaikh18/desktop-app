"use client";

import { useState, useTransition } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { Dropdown } from "react-bootstrap";
import { BsCheck2 } from 'react-icons/bs';

import Image from "next/image";
import styles from "../Header.module.scss";
export default function LocaleSwitcherSelect() {

  const [isPending, startTransition] = useTransition();
  
  
  function onChange(value: string) {
    const locale = value as Locale;
    if (locale) {
      startTransition(() => {
        setUserLocale(locale);
      });
    }
  }

  return (
    <div className="relative">
      <Dropdown align={"end"}> 
        <Dropdown.Toggle id="dropdown-basic" className={styles.languageSelection}>
          <Image
            src="/language.png"
            alt="Picture of the author"
            width={19}
            height={20}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onChange("en")}>English</Dropdown.Item>
          <Dropdown.Item onClick={() => onChange("hi")}>
            {}
            Hindi <BsCheck2 className={styles.languageSelected}/>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onChange("ml")}>
            Malayalam  <BsCheck2 className={styles.languageSelected}/>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onChange("ta")}>
            Tamil <BsCheck2 className={styles.languageSelected}/>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onChange("te")}>
            Telugu <BsCheck2 className={styles.languageSelected}/>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
