"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function dashboardpage() {

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
        redirect("/login")
    },
  });


  return (
  <div>dashboard Page</div>
  );
}
