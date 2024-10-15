import { create } from "zustand";

type StoreState = {
  PermissionList: { name: string; active: boolean }[];
  addPermission: (permission: { name: string; active: boolean }) => void;
  removePermission: (index: number) => void;
  ///////////
  listTypeOfseve:string[];
  setListTypeOfseve:(value:string) => void;
  removeListTypeOfseve:(value:any) => void;

  // Default Save Type
  defaultSaveType: number;
  setDefaultSaveType: (value: number) => void;

  // Type of Saved List
  TypeOfSavedList: number[];
  setTypeOfSavedList: (value: number[]) => void;

  // User-related state
  username: string;
  setUsername: (name: string) => void;

  passwordUser: string;
  setPasswordUser: (password: string) => void;

  userId: any;
  setUserId: (userId: any) => void;

  // Active state
  active: boolean;
  setActive: (active: boolean) => void;
};

export const useStore = create<StoreState>((set) => ({
  PermissionList: [
    {
      name: "دسترسی به بخش امنیت",
      active: false,
    },
  ],
  addPermission: (permission) =>
    set((state) => ({ PermissionList: [...state.PermissionList, permission] })),
  removePermission: (index) =>
    set((state) => ({
      PermissionList: state.PermissionList.filter((_, i) => i !== index),
    })),

  // Default Save Type
  defaultSaveType: 0,
  setDefaultSaveType: (value) =>
    set(() => ({ defaultSaveType: value })),

  // Type of Saved List
  TypeOfSavedList: [],
  setTypeOfSavedList: (value) => set(() => ({ TypeOfSavedList: value })),
  ///////this method for saved list og seave type befor createPermissions
  listTypeOfseve:[],
  setListTypeOfseve:(value) => set((state)=>({
    listTypeOfseve:[...state.listTypeOfseve,value]
  })),
  removeListTypeOfseve: (index: any) => set((state) => ({
    listTypeOfseve: state.listTypeOfseve.filter((_, i) => i !== index)
  })),
  

  // User-related state
  username: "",
  setUsername: (name) => set(() => ({ username: name })),
  passwordUser: "",
  setPasswordUser: (password) => set(() => ({ passwordUser: password })),
  userId: "",
  setUserId: (userId) => set(() => ({ userId })),

  // Active state
  active: false,
  setActive: (active) => set(() => ({ active })),
}));
