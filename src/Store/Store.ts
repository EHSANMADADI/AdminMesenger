import { create } from "zustand";

type StoreState = {
  PermissionList: { name: string; active: boolean; id: number,storageList:{saveTypeId:number,client:string,server:string}[] }[];
  addPermission: (permission: {
    storageList: never[];
    name: string;
    active: boolean;
    id: number;
  }) => void;
  removePermission: (index: number) => void;
  setPermissionss: (
    permissions: {
      storageList: { saveTypeId: number; client: string; server: string }[];
      name: string;
      active: boolean;
      id: number;
    }[]
  
  ) => void; // اضافه شده

  // لیست نوع‌های ذخیره
  listTypeOfseve: string[];
  setListTypeOfseve: (value: string) => void;
  removeListTypeOfseve: (value: any) => void;

  // نوع پیش‌فرض ذخیره‌سازی
  defaultSaveType: number;
  setDefaultSaveType: (value: number) => void;

  // لیست نوع‌های ذخیره‌شده
  saveTypeIds: number[];
  setSaveTypeIds: (value: number) => void;

  // اطلاعات کاربر
  username: string;
  setUsername: (name: string) => void;

  passwordUser: string;
  setPasswordUser: (password: string) => void;

  userId: any;
  setUserId: (userId: any) => void;

  // وضعیت فعال
  active: boolean;
  setActive: (active: boolean) => void;



  //////
  idTable:number,
  setIdTable:(value:number)=>void
};

export const useStore = create<StoreState>((set) => ({
  PermissionList: [
    {
      name: "",
      active: false,
      id: 0,
      storageList: [], // اینجا باید به جای saveTypes از storageList استفاده شود
    },
  ],

  addPermission: (permission) =>
    set((state) => ({
      PermissionList: [
        ...state.PermissionList,
        {
          ...permission,
          storageList: permission.storageList || [], // اضافه کردن storageList به پرمیژن
        },
      ],
    })),

  removePermission: (index) =>
    set((state) => ({
      PermissionList: state.PermissionList.filter((item) => item.id !== index),
    })),

  // تابع جدید برای تنظیم لیست پرمیژن‌ها
  setPermissionss: (permissions) =>
    set(() => ({
      PermissionList: permissions.map(permission => ({
        ...permission,
        storageList: permission.storageList || [], // اضافه کردن storageList در صورت نبودن
      })),
    })),

  // Default Save Type
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
  removeListTypeOfseve: (index: any) =>
    set((state) => ({
      listTypeOfseve: state.listTypeOfseve.filter((_, i) => i !== index),
    })),

  // اطلاعات کاربر
  username: "",
  setUsername: (name) => set(() => ({ username: name })),
  passwordUser: "",
  setPasswordUser: (password) => set(() => ({ passwordUser: password })),
  userId: "",
  setUserId: (userId) => set(() => ({ userId })),

  // وضعیت فعال
  active: false,
  setActive: (active) => set(() => ({ active })),

  idTable:0,
  setIdTable:(value)=>set(() => ({ idTable:value}))
}));

