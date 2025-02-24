"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
interface DeleteProps {
  item: string,
  id: string;
}

const Delete: React.FC<DeleteProps> = ({item,id }) => {
  const [loading, setLoading] = useState(false);
  const onDelete = async () => {
    try {
      setLoading(true);
      const itemType = item === "order"? "order":"product"
      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLoading(false)
        window.location.href = (`/dashboard/${itemType}`);
        toast.success(`${item} ဖျက်ပြီးပြီ။`);
      }
    } catch (err) {
      console.log(err);
      toast.error("မိတ်ဆွေ တစ်ခုခုမှာနေသည်!");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-600 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-700">
            ဒေတာကို အမှန်တကယ်ဖျက်မှာလား?
          </AlertDialogTitle>
          <AlertDialogDescription>
            ဒေတာကို ဖျက်ခဲပြီးလျှင် ပြန်ယူ၍မရပါ။
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>မဖျက်ပါ။</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 text-white" onClick={onDelete}>
            ဖျက်သည်။
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
