import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-3xl">HELLO</p>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
}
