// pages/walkins-details/[jobId].tsx
"use client";
import React from "react";
import { useRouter } from "next/router";
import WalkinsDetails from "@/components/Walkins/WalkinsDetails";

const WalkinsDetailsPage = () => {
  const router = useRouter();
  const { jobId } = router.query; // Extract jobId from URL

  if (!jobId) return <div>Loading...</div>;

  return (
    <div>
      <WalkinsDetails jobId={jobId as string} />
    </div>
  );
};

export default WalkinsDetailsPage;
