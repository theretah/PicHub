export interface Props {
  updateAvatar: (dataUrl: string) => void;
  closeModal: () => void;
  modalOpen: boolean;
  setModalOpen: () => void;
}
