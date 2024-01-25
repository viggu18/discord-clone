import { type FC } from "react";
import { redirect } from "next/navigation";
import { ChannelType, MemberRole } from "@prisma/client";

import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import ServerHeader from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar: FC<ServerSidebarProps> = async ({ serverId }) => {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) return redirect("/");

  const textChannels = server.channels.filter(
    (item) => item.type === ChannelType.TEXT
  );
  const audioChannels = server.channels.filter(
    (item) => item.type === ChannelType.AUDIO
  );
  const videoChannels = server.channels.filter(
    (item) => item.type === ChannelType.VIDEO
  );

  const members = [];
  let role;

  for (let member of server.members) {
    if (member.profileId !== profile.id) {
      members.push(member);
    } else {
      role = member.role;
    }
  }

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role as MemberRole} />
    </div>
  );
};

export default ServerSidebar;
