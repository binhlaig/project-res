import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";

import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
 
  return (
    <div className="flex max-lg:flex-col text-gray-600">
      <LeftSideBar />
      <TopBar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
