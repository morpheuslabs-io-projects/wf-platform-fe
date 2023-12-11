import { create } from "zustand";

export interface IAlertStore {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
  handleClose: () => void;

  success: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
}

export const useAlert = create<IAlertStore>((set) => ({
  open: false,
  message: "",
  severity: "success",
  handleClose: () => {
    set({ open: false });
  },

  success: (message: string) => {
    set({ open: true, message, severity: "success" });
  },

  info: (message: string) => {
    set({ open: true, message, severity: "info" });
  },

  warning: (message: string) => {
    set({ open: true, message, severity: "warning" });
  },

  error: (message: string) => {
    set({ open: true, message, severity: "error" });
  },
}));
