"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Static data (could be props or fetched in real app)
const ORDER = {
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

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  marginTop: 6,
  padding: 0,
};

const cardStyle: React.CSSProperties = {
  width: "450px",
};

const dashedHrStyle: React.CSSProperties = {
  borderTop: "2px dashed #EDEDED",
  opacity: 1,
};

const paymentBtnStyle: React.CSSProperties = {
  backgroundColor: "#0045E6",
  borderColor: "#0045E6",
  height: "46px",
};

const Page = () => {
  const router = useRouter();

  return (
    <main
      className="container d-flex justify-content-center align-items-center"
      style={containerStyle}
      aria-label="Order Summary Page"
    >
      <div className="row justify-content-center w-100">
        {/* Back Button */}
        <div className="col-auto">
          <button
            onClick={() => window.history.back()}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
            aria-label="Go back"
            type="button"
          >
            <Image src="/back.svg" alt="Back" width={30} height={30} />
          </button>
        </div>

        {/* Summary Card */}
        <section
          className="col-md-5"
          style={cardStyle}
          aria-label="Order Summary"
        >
          <div className="card rounded-4 shadow-sm border">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Summary</h5>
              {/* Order Details */}
              <div className="row mb-2">
                <div className="col-6 text-secondary">Service</div>
                <div className="col-6 text-end fw-medium">
                  {ORDER.service}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6 text-secondary">Order ID</div>
                <div className="col-6 text-end fw-medium">
                  {ORDER.orderId}
                </div>
              </div>
              <hr className="my-3" style={dashedHrStyle} />
              <div className="row mb-2">
                <div className="col-6 text-secondary">Name</div>
                <div className="col-6 text-end fw-medium">{ORDER.name}</div>
              </div>
              <div className="row mb-2">
                <div className="col-6 text-secondary">Email</div>
                <div className="col-6 text-end fw-medium">{ORDER.email}</div>
              </div>
              <div className="row mb-2">
                <div className="col-6 text-secondary">Contact</div>
                <div className="col-6 text-end fw-medium">{ORDER.contact}</div>
              </div>
              <div className="row mb-2">
                <div className="col-6 text-secondary">Date</div>
                <div className="col-6 text-end fw-medium">{ORDER.date}</div>
              </div>
              <div className="row mb-2">
                <div className="col-6 text-secondary">Time</div>
                <div className="col-6 text-end fw-medium">{ORDER.time}</div>
              </div>
              <hr className="my-1" style={dashedHrStyle} />
            </div>
          </div>
        </section>

        {/* Payment Details Card */}
        <section
          className="col-md-5"
          style={cardStyle}
          aria-label="Payment Details"
        >
          <div className="card rounded-4 shadow-sm border">
            <div className="card-body p-4">
              <div className="bg-light rounded-3 p-3 mb-4">
                <h5 className="text-center fw-bold m-0">Payment details</h5>
              </div>
              <div className="row mb-2">
                <div className="col-8 text-secondary">{ORDER.service}</div>
                <div className="col-4 text-end fw-medium">
                  ₹{ORDER.price} /-
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-8 text-secondary">
                  Service Convenience Fee:
                </div>
                <div className="col-4 text-end fw-medium">
                  ₹{ORDER.fee} /-
                </div>
              </div>
              <hr className="my-3" style={dashedHrStyle} />
              <div className="row">
                <div className="col-8 text-secondary">Amount</div>
                <div className="col-4 text-end fw-bold">₹{ORDER.total}</div>
              </div>
              <button
                className="btn w-100 py-2 mt-4"
                style={paymentBtnStyle}
                onClick={() => router.push("/medical/payment-sucess")}
                type="button"
                aria-label="Proceed to Payment"
              >
                <span
                  className="fw-semibold text-white"
                  style={{ fontSize: "16px" }}
                >
                  Proceed to Payment
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
