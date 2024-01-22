import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import React, { type ReactNode } from "react";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <div className="w-[72px] inset-y-0 hidden md:flex z-30 fixed flex-col">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
