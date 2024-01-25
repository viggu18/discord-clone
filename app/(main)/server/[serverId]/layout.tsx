import { redirectToSignIn } from "@clerk/nextjs";

import { redirect } from "next/navigation";

import db from "@/lib/db";
import currentProfile from "@/lib/currentProfile";
import ServerSidebar from "@/components/server/server-sidebar";

const Layout = async ({
  children,
  params: { serverId },
}: layout & { params: { serverId: string } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) return redirect("/");

  return (
    <div>
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default Layout;
