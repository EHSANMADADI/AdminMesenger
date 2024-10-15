import { create } from "zustand";

type StoreState = {
  PermissionList: { name: string; active: boolean; id: number }[];
  addPermission: (permission: { name: string; active: boolean; id: number }) => void;
  removePermission: (index: number) => void;
  setPermissionss: (permissions: { name: string; active: boolean; id: number }[]) => void; // اضافه شده

  // لیست نوع‌های ذخیره
  listTypeOfseve: string[];
  setListTypeOfseve: (value: string) => void;
  removeListTypeOfseve: (value: any) => void;

  // نوع پیش‌فرض ذخیره‌سازی
  defaultSaveType: number;
  setDefaultSaveType: (value: number) => void;

  // لیست نوع‌های ذخیره‌شده
  TypeOfSavedList: number[];
  setTypeOfSavedList: (value: number[]) => void;

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
};

export const useStore = create<StoreState>((set) => ({
  PermissionList: [
    {
      name: "دسترسی به بخش امنیت",
      active: false,
      id: 0,
    },
  ],

  addPermission: (permission) =>
    set((state) => ({
      PermissionList: [...state.PermissionList, permission],
    })),

  removePermission: (index) =>
    set((state) => ({
      PermissionList: state.PermissionList.filter((item) => item.id !== index),
    })),

  // تابع جدید برای تنظیم لیست پرمیژن‌ها
  setPermissionss: (permissions) =>
    set(() => ({
      PermissionList: permissions,
    })),

  // Default Save Type
  defaultSaveType: 0,
  setDefaultSaveType: (value) => set(() => ({ defaultSaveType: value })),

  // Type of Saved List
  TypeOfSavedList: [],
  setTypeOfSavedList: (value) => set(() => ({ TypeOfSavedList: value })),

  // ذخیره‌سازی لیست نوع‌های قبل از ایجاد پرمیژن
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
}));
