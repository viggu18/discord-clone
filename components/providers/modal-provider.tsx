"use client";

import CreateServerModal from "@/components/modals/create-server-modal";
import RenderInClient from "@/components/render-in-client";
import InviteModal from "../modals/invite-modal";

const ModalProvider = () => {
  return (
    <RenderInClient>
      <CreateServerModal />
      <InviteModal />
    </RenderInClient>
  );
};

export default ModalProvider;
