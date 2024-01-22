import { auth } from "@clerk/nextjs";
import db from "./db";

const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const user = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return user;
};

export default currentProfile;
