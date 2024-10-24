"use client";
import JobDetails from "@/components/jobs/JobDetails";
import React, { useState, useEffect } from "react";

type JobData = {
  media: string;
  postedDate: string;
  expiry: string;
  agencyName: string;
  location: string;
  noOfPositions: number;
};

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
  <>
      <JobDetails
          jobId={id}
        />
    
      </>
  );
};

export default Page;
