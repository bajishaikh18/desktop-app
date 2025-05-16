"use client";
import React from "react";
import { useRouter } from "next/navigation";

const containerStyle: React.CSSProperties = {
  width: "450px",
  height: "auto",
  marginTop: "5rem",
  marginBottom: "1rem",
};

const dashedHrStyle: React.CSSProperties = {
  borderTop: "2px dashed #EDEDED",
  opacity: 1,
};

const PaymentSuccessPage: React.FC = () => {
  const router = useRouter();

  return (
    <main className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light my-2">
      <section className="bg-white rounded-4 p-4 shadow" style={containerStyle}>
        <div className="mb-2 border rounded-4 p-3 shadow-sm">
          <h2
            className="text-center fs-5 fw-bold mb-4 mt-3"
            style={{ color: "#4CA819" }}
          >
            Payment Successful!
          </h2>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Service</span>
            <span className="text-dark fw-medium">GAMCA Slot Booking</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Order ID</span>
            <span className="text-dark fw-medium">45456</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Transaction ID</span>
            <span className="text-dark fw-medium">52525</span>
          </div>
          <hr className="my-3" style={dashedHrStyle} />
          <div className="d-flex justify-content-between mb-3">
            <span className="text-secondary">Name</span>
            <span className="text-dark fw-medium">Khadar Shaik</span>
          </div>
          <hr className="my-2" style={dashedHrStyle} />
        </div>

        <div className="mb-2 border rounded-4 p-3 shadow-sm">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Medical Test Fee (Wafid):</span>
            <span className="text-dark fw-medium">₹800 /-</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Service Convenience Fee:</span>
            <span className="text-dark fw-medium">₹299 /-</span>
          </div>
          <hr className="my-2" style={dashedHrStyle} />
          <div className="d-flex justify-content-between fw-bold fs-6">
            <span className="text-secondary">Amount</span>
            <span className="text-dark">₹1,099</span>
          </div>
          <div className="d-flex justify-content-between gap-2">
            <button
              className="btn btn-outline-secondary w-50 d-flex align-items-center justify-content-center gap-2 fw-bold text-dark rounded-5"
              style={{ borderColor: "#DEDEDE" }}
              type="button"
            >
              <img
                src="/downloadLogo.svg"
                alt="Download PDF Receipt"
                width={18}
                height={20}
              />
              Get PDF Receipt
            </button>
            <button
              className="btn btn-primary w-50 fw-bold rounded-5"
              style={{
                borderColor: "#DEDEDE",
                borderWidth: "1.5px",
                borderStyle: "solid",
              }}
              type="button"
              onClick={() => router.push("/")}
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
