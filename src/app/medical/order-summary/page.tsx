"use client";
import React from "react";
import Image from "next/image";


const Page = () => {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        marginTop: 6,
        padding: 0,
      }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-auto">
          <button
            onClick={() => window.history.back()}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
            aria-label="Back"
          >
            <Image src="/back.svg" alt="Back" width={30} height={30} />
          </button>
        </div>
        <div className="col-md-5" style={{ width: "450px" }}>
          <div className="card rounded-4 shadow-sm border">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Summary</h5>

              <div className="row mb-2">
                <div className="col-6 text-secondary">Service</div>
                <div className="col-6 text-end fw-medium">
                  GAMCA Slot Booking
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-6 text-secondary">Order ID</div>
                <div className="col-6 text-end fw-medium">000000</div>
              </div>

              <hr
                className="my-3"
                style={{
                  borderTop: "2px dashed #EDEDED",
                  opacity: 1,
                }}
              />

              <div className="row mb-2">
                <div className="col-6 text-secondary">Name</div>
                <div className="col-6 text-end fw-medium">
                  Baji Shaikh
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-6 text-secondary">Email</div>
                <div className="col-6 text-end fw-medium">
                  Khadar20@gmail.com
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-6 text-secondary">Contact</div>
                <div className="col-6 text-end fw-medium">8340816098</div>
              </div>

              <div className="row mb-2">
                <div className="col-6 text-secondary">Date</div>
                <div className="col-6 text-end fw-medium">19-Mar-2025</div>
              </div>

              <div className="row mb-2">
                <div className="col-6 text-secondary">Time</div>
                <div className="col-6 text-end fw-medium">16:48</div>
              </div>

              <hr
                className="my-1"
                style={{
                  borderTop: "2px dashed #EDEDED",
                  opacity: 1,
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-md-5" style={{ width: "450px" }}>
          <div className="card rounded-4 shadow-sm border">
            <div className="card-body p-4">
              <div className="bg-light rounded-3 p-3 mb-4">
                <h5 className="text-center fw-bold m-0">Payment details</h5>
              </div>

              <div className="row mb-2">
                <div className="col-8 text-secondary">GAMCA Slot Booking</div>
                <div className="col-4 text-end fw-medium">₹880 /-</div>
              </div>

              <div className="row mb-3">
                <div className="col-8 text-secondary">
                  Service Convenience Fee:
                </div>
                <div className="col-4 text-end fw-medium">₹119 /-</div>
              </div>

              <hr
                className="my-3"
                style={{
                  borderTop: "2px dashed #EDEDED",
                  opacity: 1,
                }}
              />

              <div className="row">
                <div className="col-8 text-secondary">Amount</div>
                <div className="col-4 text-end fw-bold">₹999</div>
              </div>

              <button
                className="btn w-100 py-2 mt-4"
                style={{
                  backgroundColor: "#0045E6",
                  borderColor: "#0045E6",
                  height: "46px",
                }}
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
        </div>
      </div>
    </div>
  );
};

export default Page;
