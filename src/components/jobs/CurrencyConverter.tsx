import { Form, FormControl, Table } from "react-bootstrap";
import styles from "./JobDetail.module.scss";
import Image from "next/image";

export type Position = {
  positionId: number;
  title: string;
  experience: string;
  salary: string;
};

export const CurrencyConverter = ({ currency,country }: { currency: string,country:string }) => {
  return (
    <div className={styles.currencyContainer}>
        <div>
        <h3>Convert Salary in INR</h3>
        <div className={styles.currencyInput}>
            <h4>{country} ({currency})</h4>
            <FormControl type="number" placeholder="Enter Amount" className={styles.currencyInputField}/>
        </div>
        </div>
        <div className={styles.currencyOutput}>
            <h2>₹0.00</h2>
        </div>
    </div>
  );
};
