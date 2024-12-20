import { create } from "zustand";

type StoreState = {
  PermissionList: {
    name: string;
    active: boolean;
    id: number;
    storageList: { saveTypeId: number; client: string; server: string }[];
    defalt:number
  }[];
  addPermission: (permission: {
    storageList: never[];
    name: string;
    active: boolean;
    id: number;
    defalt:number
  }) => void;
  removePermission: (index: number) => void;
  setPermissionss: (
    permissions: {
      storageList: { saveTypeId: number; client: string; server: string }[];
      name: string;
      active: boolean;
      id: number;
      defalt:number;
    }[]
  ) => void;

  ///////////////////////
  // permissionId:number[],
  // setPerMisswionId:(value:number)=>void
  //////////

  listTypeOfseve: string[];
  setListTypeOfseve: (value: string) => void;
  removeListTypeOfseve: (index: number) => void;
  removeAllListTypeOfSave: () => void;

  defaultSaveType: number;
  setDefaultSaveType: (value: number) => void;
  // removeDefalt:()=>void

  saveTypeIds: number[];
  setSaveTypeIds: (value: number) => void;
  removeSaveTypeIds: (index: number) => void;
  removeAllSaveTypeIds: () => void;

  username: string;
  setUsername: (name: string) => void;

  passwordUser: string;
  setPasswordUser: (password: string) => void;

  userId: string | null;
  setUserId: (userId: string | null) => void;

  active: boolean;
  setActive: (active: boolean) => void;

  idTable: number;
  setIdTable: (value: number) => void;

  adminList: number[];
  setAdminList: (value: number) => void;
  removeAdminList: (id: number) => void;
  removeAllAdminList:()=>void;

  Members: number[];
  setMembers: (value: number) => void;
  removeMembers: (id: number) => void;
  removeAllMembers:()=>void;
};

export const useStore = create<StoreState>((set) => ({
  PermissionList: [
    {
      name: "",
      active: false,
      id: 0,
      storageList: [],
      defalt:0
    },
  ],

  addPermission: (permission) =>
    set((state) => ({
      PermissionList: [
        ...state.PermissionList,
        {
          ...permission,
          storageList: permission.storageList || [],
        },
      ],
    })),

  removePermission: (index) =>
    set((state) => ({
      PermissionList: state.PermissionList.filter((item) => item.id !== index),
    })),

  setPermissionss: (permissions) =>
    set(() => ({
      PermissionList: permissions.map((permission) => ({
        ...permission,
        storageList: permission.storageList || [],
        
      })),
    })),

  defaultSaveType: 0,
  setDefaultSaveType: (value) => set(() => ({ defaultSaveType: value })),

  saveTypeIds: [],
  setSaveTypeIds: (value: number) =>
    set((state) => ({
      saveTypeIds: [...state.saveTypeIds, value],
    })),

  listTypeOfseve: [],
  setListTypeOfseve: (value) =>
    set((state) => ({
      listTypeOfseve: [...state.listTypeOfseve, value],
    })),
  ////////////////////////////////////////////////////////////////
  removeListTypeOfseve: (index: number) =>
    set((state) => ({
      listTypeOfseve: state.listTypeOfseve.filter((_, i) => i !== index),
    })),
  removeAllListTypeOfSave: () =>
    set(() => ({
      listTypeOfseve: [],
    })),

    removeSaveTypeIds: (saveTypeId) => set((state) => ({
      PermissionList: state.PermissionList.map((permission) => ({
        ...permission,
        storageList: permission.storageList.filter(
          (item) => item.saveTypeId !== saveTypeId
        ),
      })),
    })),
    

  removeAllSaveTypeIds: () =>
    set(() => ({
      saveTypeIds: [], // Fixed here
    })),
  /////////////////////////////////////////////////////////////////////
  username: "",
  setUsername: (name) => set(() => ({ username: name })),
  passwordUser: "",
  setPasswordUser: (password) => set(() => ({ passwordUser: password })),
  userId: null,
  setUserId: (userId) => set(() => ({ userId })),

  active: false,
  setActive: (active) => set(() => ({ active })),

  idTable: 0,
  setIdTable: (value) => set(() => ({ idTable: value })),
  //////////////////////////////////////////////////////////////////
  adminList: [],
  setAdminList: (value) =>
    set((state) => ({ adminList: [...state.adminList, value] })),
  removeAdminList: (id: number) =>
    set((state) => ({
      adminList: state.adminList.filter((i) => i !== id),
    })),
    removeAllAdminList:()=>set(()=>({adminList:[]})),
  ////////////////////////////////////////////
  Members: [],
  setMembers: (value) =>
    set((state) => ({ Members: [...state.Members, value] })),
  removeMembers: (id: number) =>
    set((state) => ({
      Members: state.Members.filter((i) => i !== id),
    })),
    removeAllMembers:()=>set(()=>({ Members:[]})),
}))
