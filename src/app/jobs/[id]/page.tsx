"use client";
import JobDetails from "@/components/jobs/JobDetails";
import React  from "react";

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
