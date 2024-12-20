"use client";
import TradeDetails from "@/components/tradetestcenter/TradeDetails";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
      <TradeDetails tradeId={id} />
  );
};

export default Page;