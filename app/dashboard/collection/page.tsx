"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/collections/CollectionColumn";
import { useEffect, useState } from "react";

const collectionpage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collectionGet, setCollectionGet] = useState([]);

  const getCollection = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollectionGet(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };
  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collection Page</p>
        <Button
          className="bg-blue-700 text-white"
          type="button"
          onClick={() => router.push("/dashboard/collection/new")}
        >
          <Plus /> အသစ်
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={collectionGet} searchKey="title" />
    </div>
  );
};

export default collectionpage;
