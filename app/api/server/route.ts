import axios from "axios";
import currentProfile from "@/lib/currentProfile";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();

    const user = await currentProfile();

    if (!user) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: user.id,
        name,
        imageUrl,
        inviteCode: uuid(),
        channels: {
          create: [{ name: "general", profileId: user.id }],
        },
        members: {
          create: [
            {
              profileId: user.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[server_post]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
