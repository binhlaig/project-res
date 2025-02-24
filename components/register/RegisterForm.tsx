"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import UploadImage from "../customUI/UploadImage";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(4).max(50),
  address: z.string().min(2).max(50),
  image: z.string(),
});

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user
  if (user) {
    redirect('/dashboard');
    return;
  }
 
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email:"",
      password: "",
      address: "",
      image: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
     console.log(values);
    try {
      setLoading(true);
     
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if(res.ok){
        setLoading(false);
        toast.success( "User created")
        router.push("/login")
      }
    } catch (err) {
      console.log("[user_POST]", err);
      toast.error("something worng!");
      
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-16 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-bold  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome to Bin Hlaig Group
        </h1>
        <h2 className="text-bold  text-blue-700 mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
       Register
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-blue-700">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="address" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>image</FormLabel>
                <FormControl>
                 <UploadImage 
                  value={field.value ? [field.value] : []}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="flex gap-10" >
            <Button type="submit" className="bg-blue-700 text-white" >
             Submit
            </Button>
            <Button
              type="button"
              className="bg-blue-700 text-white"
              onClick={() => router.push("/login")}
            >
             Login
            </Button>
          </div>
         
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
