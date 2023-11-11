import { redirect } from "next/navigation";
import initalProfile from "@/lib/inital-profile";
import db from "@/lib/db";

const Setup = async () => {
  const profile = await initalProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/server/${server.id}`);
  }

  return <div>Setup </div>;
};

export default Setup;
