import { v4 as uuid } from "uuid";
import currentProfile from "@/lib/currentProfile";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(
  req: Request,
  { params: { serverId } }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuid(),
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[SERVER_ID]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
