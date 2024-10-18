import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { convertCurrency } from "@/apis/jobs"; 
import styles from "./JobDetail.module.scss";

export type Position = {
  positionId: number;
  title: string;
  experience: string;
  salary: string;
};

export const CurrencyConverter = ({ jobId, currency, country }: { jobId: string, currency: string, country: string }) => {
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<string>("₹0.00");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  
  const handleAmountChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = parseFloat(e.target.value);
    setAmount(inputAmount);

    if (!isNaN(inputAmount) && inputAmount > 0) {
      try {
        setIsLoading(true);

       
        const result = await convertCurrency(jobId, inputAmount, currency, "INR");

        if (result) {
          setConvertedAmount(`₹${result.toFixed(2)}`);
        }
      } catch (error) {
        console.error("Failed to convert currency:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setConvertedAmount("₹0.00");
    }
  };

  return (
    <div className={styles.currencyContainer}>
      <div>
        <h3>Convert Salary to INR</h3>
        <div className={styles.currencyInput}>
          <h4>{country} ({currency})</h4>
          <FormControl
            type="number"
            placeholder="Enter Amount"
            className={styles.currencyInputField}
            value={amount}
            onChange={handleAmountChange}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className={styles.currencyOutput}>
        <h2>{convertedAmount}</h2>
      </div>
    </div>
  );
};
