import { create } from "zustand";

type storeState = {
  PermissionList: { name: string; active: boolean }[];
  addPermission: (permission: { name: string; active: boolean }) => void;
  removePermission: (index: number) => void; 
};

export const useStore = create<storeState>((set) => ({
  PermissionList: [
    {
      name: "دسترسی به بخش امنیت",
      active: true,
    },
  ],
  addPermission:(permission)=>set((state)=>({PermissionList:[...state.PermissionList,permission]})),
  removePermission: (index) => set((state) => ({
    PermissionList: state.PermissionList.filter((_, i) => i !== index)
})),
}));
