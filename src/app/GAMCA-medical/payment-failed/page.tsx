"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --- Types ---
interface OrderDetails {
  service: string;
  orderId: string;
  name: string;
  email: string;
  contact: string;
  date: string;
  time: string;
  price: number;
  fee: number;
  total: number;
}

// --- Styles ---
const STYLES = {
  container: {
    minHeight: "100vh",
    marginTop: 6,
    padding: 0,
  },
  card: {
    width: "450px",
  },
  dashedDivider: {
    borderTop: "2px dashed #EDEDED",
    opacity: 1,
  },
  paymentButton: {
    backgroundColor: "#0045E6",
    borderColor: "#0045E6",
    height: "46px",
  },
  backButton: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
  failedBg: {
    background: "#FF453A80",
  },
};

// --- Components ---
const InfoRow: React.FC<{
  label: string;
  value: string | number;
  isBold?: boolean;
  isPrice?: boolean;
}> = ({ label, value, isBold = false, isPrice = false }) => (
  <div className="row mb-2">
    <div className="col-6 text-secondary">{label}</div>
    <div className={`col-6 text-end ${isBold ? "fw-bold" : "fw-medium"}`}>
      {isPrice ? `₹${value} /-` : value}
    </div>
  </div>
);

const DashedDivider: React.FC = () => (
  <hr className="my-3" style={STYLES.dashedDivider} />
);

// --- Main Page ---
const PaymentFailedPage: React.FC = () => {
  const router = useRouter();

  // Mock order details (replace with real data as needed)
  const ORDER: OrderDetails = {
    service: "GAMCA Slot Booking",
    orderId: "000000",
    name: "Baji Shaikh",
    email: "Khadar20@gmail.com",
    contact: "8340816098",
    date: "19-Mar-2025",
    time: "16:48",
    price: 880,
    fee: 119,
    total: 999,
  };

  // --- Handlers ---
  const goBack = () => router.push("/GAMCA-medical");
  const retryPayment = () => router.push("/GAMCA-medical/payment-summary");

  return (
    <main
      className="container d-flex justify-content-center align-items-center"
      style={STYLES.container}
      aria-label="Order Summary Page"
    >
      <div className="row justify-content-center w-100">
        {/* Back Button */}
        <div className="col-auto">
          <button
            onClick={goBack}
            style={STYLES.backButton}
            aria-label="Go back"
            type="button"
          >
            <Image src="/back.svg" alt="Back" width={30} height={30} />
          </button>
        </div>

        {/* Order Summary Card */}
        <section
          className="col-md-5"
          style={STYLES.card}
          aria-label="Order Summary"
        >
          <div className="card rounded-4 shadow-sm border">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Summary</h5>
              <InfoRow label="Service" value={ORDER.service} />
              <InfoRow label="Order ID" value={ORDER.orderId} />
              <DashedDivider />
              <InfoRow label="Name" value={ORDER.name} />
              <InfoRow label="Email" value={ORDER.email} />
              <InfoRow label="Contact" value={ORDER.contact} />
              <InfoRow label="Date" value={ORDER.date} />
              <InfoRow label="Time" value={ORDER.time} />
              <DashedDivider />
            </div>
          </div>
        </section>

        {/* Payment Failed Card */}
        <section
          className="col-md-5"
          style={STYLES.card}
          aria-label="Payment Details"
        >
          <div className="card rounded-4 shadow-sm border">
            <div className="card-body p-4">
              <div className="rounded-3 p-3 mb-4" style={STYLES.failedBg}>
                <h5 className="text-center text-black fw-bold m-0">
                  Payment Failed !
                </h5>
              </div>
              <InfoRow
                label={ORDER.service}
                value={ORDER.price}
                isPrice={true}
              />
              <InfoRow
                label="Service Convenience Fee:"
                value={ORDER.fee}
                isPrice={true}
              />
              <DashedDivider />
              <div className="row">
                <div className="col-8 text-secondary">Amount</div>
                <div className="col-4 text-end fw-bold">₹{ORDER.total}</div>
              </div>
              <button
                className="btn w-100 py-2 mt-4 text-white"
                style={STYLES.paymentButton}
                onClick={retryPayment}
                type="button"
                aria-label="Retry"
              >
                <span className="fw-semibold" style={{ fontSize: "16px" }}>
                  Retry
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PaymentFailedPage;
