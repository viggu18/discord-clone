import { FC, Fragment } from "react";

import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InvitecodeProps {
  params: { inviteCode: string };
}
const Invite: FC<InvitecodeProps> = async ({ params: { inviteCode } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }
  return <Fragment />;
};

export default Invite;
