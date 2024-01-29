import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { memberId } }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unathorized", { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const { role } = await req.json();

    const serverId = searchParams.get("serverId");
    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (!memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const server = db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: { profile: true },
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[MEMBERS_ID_PATCH]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
