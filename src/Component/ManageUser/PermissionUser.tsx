import React, { useEffect, useState } from "react";
import api from "../../Config/api";

interface PermissionData {
  title: string;
  permissionId: number;
}

interface PermissionUserProps {
  Id: any;
}

export default function PermissionUser({ Id }: PermissionUserProps) {
  const userId = localStorage.getItem("userId");
  const [allPermissions, setAllPermissions] = useState<PermissionData[]>([]);
  const [userPermissions, setUserPermissions] = useState<PermissionData[]>([]);

  useEffect(() => {
    // دریافت لیست تمامی دسترسی‌ها
    api
      .get("/Admin/listPermissions", {
        headers: {
          userId: userId,
        },
      })
      .then((res) => {
        setAllPermissions(res.data);

        // دریافت دسترسی‌های کاربر
        api
          .get(`/Admin/getUserPermissions/${Id}`, {
            headers: {
              userId,
            },
          })
          .then((res) => {
            setUserPermissions(res.data);
            sessionStorage.setItem("userPermissions", JSON.stringify(res.data));
            console.log("getUserPermissions", res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Id, userId]);

  useEffect(() => {
    sessionStorage.setItem("userPermissions", JSON.stringify(userPermissions));
    console.log(userPermissions);
  }, [userPermissions]);

  // تابعی برای بررسی اینکه آیا دسترسی برای کاربر فعال است یا خیر
  const isUserPermission = (permission: PermissionData) => {
    return userPermissions.some(
      (userPerm) => userPerm.permissionId === permission.permissionId
    );
  };

  // تابع برای اضافه/حذف دسترسی از لیست محلی
  const togglePermission = (permission: PermissionData) => {
    setUserPermissions((prev) => {
      if (isUserPermission(permission)) {
        // حذف دسترسی از لیست محلی
        return prev.filter(
          (userPerm) => userPerm.permissionId !== permission.permissionId
        );
      } else {
        // افزودن دسترسی به لیست محلی
        return [...prev, permission];
      }
    });
  };

  return (
    <div dir="rtl">
      <h2 className="font-black text-2xl p-1 m-1">لیست دسترسی ها :</h2>

      <div className="grid xl:grid-cols-3 grid-cols-1 gap-1 w-full">
        {allPermissions.map((permission, index) => (
          <div
            key={index}
            onClick={() => togglePermission(permission)} // تابع تغییر دسترسی
            className={`items-center border-2 rounded-xl my-3 mx-1 p-3 cursor-pointer ${
              isUserPermission(permission) ? "bg-green-300" : "bg-white"
            }`}
          >
            <div className="flex items-center text-lg font-medium">
              <div className="border rounded p-3">{index + 1}</div>
              <div className="p-3">{permission.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
