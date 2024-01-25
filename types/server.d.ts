import { Member, MemberRole, Profile, Server } from "@prisma/client";

export interface ServerWithMembersWithProfie extends Server {
  members: (Member & { profile: Profile })[];
}

export interface ServerHeaderProps {
  server: ServerWithMembersWithProfie;
  role: MemberRole;
}
