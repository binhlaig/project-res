"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "../custom ui/Loader";
import { Input } from "../ui/input";
import UploadImage from "../customUI/UploadImage";


const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(1000),
  image: z.string(),
});
interface collectionFormProps {
  initialData?: CollectionType | null;
}

const CollectionForm: React.FC<collectionFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/collections/${initialData._id}`
        : "/api/collections";

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Product ${initialData ? "Updated" : "Created"}`);
        window.location.href = "/dashboard/collection";
        router.push("/dashboard/collection");
      }
    } catch (err) {
      console.log("[collections_POST]", err);
      toast.error("something worng!");
    }
  };

  return loading ? <Loader/>: (
    <div className="p-10">
      <div className="flex items-center justify-between">
        {initialData ? (
          <p className="text-heading2-bold">Edit Product</p>
        ) : (
          <p className="text-heading2-bold">Collection ဖန်းတီးခြင်း</p>
        )}
      </div>
      <Separator className="my-4" />
      
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 text-blue-700"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ပစွည်းအမျိုးအစား အမည်</FormLabel>
                <FormControl>
                  <Input placeholder="ပစွည်းအမျိုးအစား ကိုထည့်ပါ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>အကြောင်းအရာ</FormLabel>
                <FormControl>
                  <Textarea placeholder="လိုအပ်သော အကြောင်းအရာကို ဖြည့်သွင်းပါ" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <UploadImage
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-700 text-white">
              submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/dashboard/collection")}
              className="bg-blue-700 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
