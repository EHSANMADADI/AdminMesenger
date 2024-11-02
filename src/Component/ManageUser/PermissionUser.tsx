import React, { useEffect, useState } from "react";
import api from "../../Config/api";
import UserUi from "../CreateGroup/UserUi";

interface PermissionData {
  title: string;
  permissionId: number;
}

interface PermissionUserProps {
  Id: any;
}
interface Members {
  id: number;
  avatar: string;
  fullname: string;
  username: string;
}
interface User {
  id: number;
  avatar: string;
  fullname: string;
  username: string;
}
export default function PermissionUser({ Id }: PermissionUserProps) {
  const userId = localStorage.getItem("userId");
  const [allPermissions, setAllPermissions] = useState<PermissionData[]>([]);
  const [userPermissions, setUserPermissions] = useState<PermissionData[]>([]);
  const [addUsers, setAddUsers] = useState<Members[]>([]);

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

  useEffect(() => {
    const userPermissionId=userPermissions.map((item)=>item.permissionId)
    
    api
      .post(
        "/Admin/UsersByPermissions",
        userPermissionId, // ارسال آرایه‌ای از `id`ها بدون نام
        {
          headers: {
            userId,
          },
        }
      )
      .then((response) => {
        console.log("UserByPermission", response.data);
        if (response.data && Array.isArray(response.data.users)) {
          const uniqueUserIds = new Set<string>(response.data.users.map((user: { id: any; }) => user.id)); // ایجاد Set برای شناسه‌های یکتا
          const uniqueUsers: User[] = [];
  
          // ساخت اشیاء کاربر از روی شناسه‌های یکتا
          uniqueUserIds.forEach(id => {
            const user = response.data.users.find((user: { id: string; }) => user.id === id); // پیدا کردن کاربر بر اساس شناسه
            if (user) {
              uniqueUsers.push(user); // اضافه کردن کاربر به آرایه یکتا
            }
          });
  
          setAddUsers(uniqueUsers); // بروزرسانی لیست کاربران
        } else if (response.data) {
          const upUser: User[] = []; // نوع آرایه را مشخص کنید
          for (const item of response.data) {
            if (Array.isArray(item.users)) {
              item.users.forEach((user: User) => upUser.push(user)); // اضافه کردن کاربران به upUser
            }
          }
  
          // حذف کاربران تکراری
          const uniqueUpUser = Array.from(new Set(upUser.map(user => user.id)))
            .map(id => upUser.find(user => user.id === id)); // ایجاد اشیاء کاربر برای کاربران یکتا
  
            setAddUsers(uniqueUpUser as User[]); // اطمینان از نوع کاربر
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

      <div className="flex w-full border-b-2">
        <h2 className="text-2xl font-bold p-3">افزودن کاربر</h2>
      </div>
      <div className="max-h-1/3 w-full overflow-auto grid grid-cols-2 my-3">
        {addUsers.map((user,i) => {
          return (
            <UserUi
            key={i}
              fullname={user.fullname}
              avatar={user.avatar}
              id={user.id}
            />
          );
        })}
      </div>
    </div>
  );
}
