"use client";

import { useTransition } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { Dropdown, Form, FormSelect } from "react-bootstrap";
import Image from "next/image";
import styles from "../Header.module.scss";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

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
