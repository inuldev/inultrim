import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("stream-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("stream-theme", theme);
    set({ theme });
  },
}));
