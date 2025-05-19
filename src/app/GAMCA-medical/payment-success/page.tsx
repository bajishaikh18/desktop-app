"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Types definition for better type safety
interface PaymentDetails {
  service: string;
  orderId: string;
  transactionId: string;
  name: string;
  testFee: number;
  serviceFee: number;
  total: number;
}

// Constants for styling to maintain consistency
const STYLES = {
  container: {
    width: "450px",
    height: "auto",
    marginTop: "5rem",
    marginBottom: "1rem",
  },
  dashedDivider: {
    borderTop: "2px dashed #EDEDED",
    opacity: 1,
  },
  successTitle: {
    color: "#4CA819"
  },
  downloadButton: {
    borderColor: "#DEDEDE"
  },
  homeButton: {
    borderColor: "#DEDEDE",
    borderWidth: "1.5px",
    borderStyle: "solid",
  }
};

// Reusable info row component for consistent display of key-value pairs
const InfoRow: React.FC<{
  label: string;
  value: string | number;
  isBold?: boolean;
  isPrice?: boolean;
}> = ({ label, value, isBold = false, isPrice = false }) => (
  <div className="d-flex justify-content-between mb-2">
    <span className="text-secondary">{label}</span>
    <span className={`text-dark ${isBold ? "fw-bold" : "fw-medium"}`}>
      {isPrice ? `₹${value} /-` : value}
    </span>
  </div>
);

// Component for divider to avoid repetition
const DashedDivider: React.FC = () => (
  <hr className="my-3" style={STYLES.dashedDivider} />
);

const PaymentSuccessPage: React.FC = () => {
  const router = useRouter();
  
  // Static data (could come from props or context in a real app)
  const PAYMENT: PaymentDetails = {
    service: "GAMCA Slot Booking",
    orderId: "45456",
    transactionId: "52525",
    name: "Khadar Shaik",
    testFee: 800,
    serviceFee: 299,
    total: 1099,
  };

  const handleHomeClick = () => router.push("/");
  
  const handleDownloadPdf = () => {
    // Implement PDF download functionality here
    console.log("Downloading PDF receipt");
    // In a real app, this would trigger a download
  };

  // Format currency with comma separator
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN');
  };

  return (
    <main className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light my-4">
      <section className="bg-white rounded-4 p-4 shadow" style={STYLES.container}>
        {/* Payment Success Details */}
        <div className="mb-2 border rounded-4 p-3 shadow-sm">
          <h2
            className="text-center fs-5 fw-bold mb-4 mt-3"
            style={STYLES.successTitle}
            aria-live="polite"
          >
            Payment Successful!
          </h2>
          
          <InfoRow label="Service" value={PAYMENT.service} />
          <InfoRow label="Order ID" value={PAYMENT.orderId} />
          <InfoRow label="Transaction ID" value={PAYMENT.transactionId} />
          
          <DashedDivider />
          
          <InfoRow label="Name" value={PAYMENT.name} />
          
          <DashedDivider />
        </div>

        {/* Payment Amount Details */}
        <div className="mb-2 border rounded-4 p-3 shadow-sm">
          <InfoRow 
            label="Medical Test Fee (Wafid):" 
            value={PAYMENT.testFee} 
            isPrice={true} 
          />
          <InfoRow 
            label="Service Convenience Fee:" 
            value={PAYMENT.serviceFee} 
            isPrice={true} 
          />
          
          <DashedDivider />
          
          <div className="d-flex justify-content-between fw-bold fs-6">
            <span className="text-secondary">Amount</span>
            <span className="text-dark">₹{formatCurrency(PAYMENT.total)}</span>
          </div>
          
          {/* Action Buttons */}
          <div className="d-flex justify-content-between gap-2 mt-3">
            <button
              className="btn btn-outline-secondary w-50 d-flex align-items-center justify-content-center gap-2 fw-bold text-dark rounded-5"
              style={STYLES.downloadButton}
              type="button"
              onClick={handleDownloadPdf}
              aria-label="Download PDF Receipt"
            >
              <Image
                src="/downloadLogo.svg"
                alt=""
                width={18}
                height={20}
                aria-hidden="true"
              />
              Get PDF Receipt
            </button>
            <button
              className="btn btn-primary w-50 fw-bold rounded-5"
              style={STYLES.homeButton}
              type="button"
              onClick={handleHomeClick}
              aria-label="Navigate to home page"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
      
      <p className="text-center text-secondary small mt-2 mb-4">
        Note: You will receive your <b>GAMCA</b> slip within short time
      </p>
    </main>
  );
};

export default PaymentSuccessPage;