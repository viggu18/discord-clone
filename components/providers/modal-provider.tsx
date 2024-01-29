"use client";

import RenderInClient from "@/components/render-in-client";

import CreateServerModal from "@/components/modals/create-server-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import InviteModal from "@/components/modals/invite-modal";
import MembersModal from "@/components/modals/members-modal";

const ModalProvider = () => {
  return (
    <RenderInClient>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
    </RenderInClient>
  );
};

export default ModalProvider;
