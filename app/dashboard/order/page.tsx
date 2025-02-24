"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/order/orderColunm";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";

const orderPage = () => {
  const [orderget, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrder = async () => {
    try {
      const res = await fetch("/api/order", {
        method: "GET",
      });
      const data = await res.json();
      setOrder(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  console.log(orderget);

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Order Page</p>
      </div>
      <Separator className="my-4" />
     
     <DataTable columns={columns} data={orderget} searchKey="username" />

      <div></div>
    </div>
  );
};

export default orderPage;
