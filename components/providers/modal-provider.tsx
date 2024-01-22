"use client";

import CreateServerModal from "@/components/modals/create-server-modal";
import RenderInClient from "@/components/render-in-client";

const ModalProvider = () => {
  return (
    <RenderInClient>
      <CreateServerModal />
    </RenderInClient>
  );
};

export default ModalProvider;
