"use client";

import RenderInClient from "@/components/render-in-client";

import CreateServerModal from "@/components/modals/create-server-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import InviteModal from "@/components/modals/invite-modal";

const ModalProvider = () => {
  return (
    <RenderInClient>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
    </RenderInClient>
  );
};

export default ModalProvider;
