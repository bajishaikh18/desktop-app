"use client";

import { useTransition } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { Dropdown } from "react-bootstrap";


import Image from "next/image";
import styles from "../Header.module.scss";
export default function LocaleSwitcherSelect() {

  const [, startTransition] = useTransition();
  
  
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
            src="/icons/language.svg"
            alt="Picture of the author"
            width={19}
            height={20}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onChange("en")}>English</Dropdown.Item>
          <Dropdown.Item onClick={() => onChange("hi")}>
            Hindi
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onChange("ml")}>
            Malayalam
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onChange("ta")}>
            Tamil
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onChange("te")}>
            Telugu
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
