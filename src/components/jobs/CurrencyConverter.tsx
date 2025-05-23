import { useCallback, useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { convertCurrency } from "@/apis/jobs"; 
import styles from "../common/styles/Details.module.scss";
import { useTranslations } from "next-intl";
import { useDebounce } from "@uidotdev/usehooks";

export const CurrencyConverter = ({ jobId, currency, country }: { jobId: string, currency: string, country: string }) => {
  const [amount, setAmount] = useState<number | string>("");
  const [convertedAmount, setConvertedAmount] = useState<string>("₹0.00");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useTranslations("Currency");  
  const debouncedAmount = useDebounce(amount, 300);

  useEffect(()=>{
    if(debouncedAmount){
      sendRequest(debouncedAmount as string)
    }
  },[debouncedAmount])


  const handleAmountChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = e.target.value; 
    setAmount(inputAmount); 
  };

  const sendRequest = useCallback(async (inputAmount: string) => {
    const parsedAmount = parseFloat(inputAmount); 

    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      try {
        setIsLoading(true);

        const result = await convertCurrency(jobId, parsedAmount, currency.toLowerCase(), "inr"); 

        if (result) {
         
          const formattedAmount = (Math.round(result * 100) / 100).toFixed(2);
          setConvertedAmount(`₹${formattedAmount}`);
        }
      } catch (error) {
        console.error("Failed to convert currency:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
     
      setConvertedAmount(inputAmount ? `₹${inputAmount}` : "₹0.00");
    }
  }, []);


  return (
    <div className={styles.currencyContainer}>
      <div>
        <h3>{t('convert_salary_to_inr')}
        </h3>
        <div className={styles.currencyInput}>
          <h4>{country} ({currency})</h4>
          <FormControl
            type="number"
            placeholder={t("enter_amount")}
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
