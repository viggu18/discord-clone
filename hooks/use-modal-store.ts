import { create } from "zustand";
import { Server } from "@prisma/client";

export type ModalType = "createServer" | "invite";

interface ModalData {
  server?: Server;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}
const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => {
    set({ type, isOpen: true, data });
  },
  onClose: () => set({ type: null, isOpen: false, data: {} }),
}));

export default useModal;
