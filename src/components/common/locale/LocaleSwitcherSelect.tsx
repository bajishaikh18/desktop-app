'use client';

import {useTransition} from 'react';
import {Locale} from '@/i18n/config';
import {setUserLocale} from '@/services/locale';
import { Form, FormSelect } from 'react-bootstrap';

type Props = {
  defaultValue: string;
  items: Array<{value: string; label: string}>;
  label: string;
};

export default function LocaleSwitcherSelect() {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    if(locale){
        startTransition(() => {
            setUserLocale(locale);
          });
    }
   
  }

  return (
    <div className="relative">
     <Form.Select aria-label="Default select example" onChange={(e)=>onChange(e.target.value)}>
      <option value=''>Lanugae</option>
      <option value="en">English</option>
      <option value="ma">Malayalam</option>
    </Form.Select>
    </div>
  );
}