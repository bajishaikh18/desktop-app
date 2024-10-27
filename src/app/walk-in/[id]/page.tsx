"use client";
import WalkinsDetails from "@/components/walkins/WalkinsDetails";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
  <>
      <WalkinsDetails
          walkinId={id}
        />
    
      </>
  );
};

export default Page;
