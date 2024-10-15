import React, { useEffect } from "react";
import { MdOutlineDone } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import api from "../../Config/api";
import { FaEdit } from "react-icons/fa";
import { useStore } from "../../Store/Store";

export default function ListPermission() {
  const { PermissionList, removePermission, userId, setPermissionss } = useStore(); // استفاده از setPermissions

  useEffect(() => {
    api
      .get("/Admin/listPermissions", {
        headers: {
          userId: userId,
        },
      })
      .then((response) => {
        console.log(response.data);

        // استفاده از setPermissions برای تنظیم کل لیست پرمیژن‌ها
        setPermissionss(
          response.data.map((item: { title: string; permissionId: number }) => ({
            name: item.title,
            active: true,
            id: item.permissionId,
          }))
        );
      });
  }, [userId, setPermissionss]);

  const deletItem = (id: number) => {
    Swal.fire({
      title: "آیا میخواهید این دسترسی را حذف کنید ؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    }).then((res) => {
      if (res.isConfirmed) {
        api
          .delete(`/Admin/deletePermission/${id}`, {
            headers: {
              userId: userId,
            },
          })
          .then(() => {
            removePermission(id);
            Swal.fire({
              title: " با موفقیت حذف شد",
              icon: "success",
            });
          });
      }
    });
  };

  return (
    <>
      {PermissionList.map((permission, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-2 my-3 rounded-md bg-white p-1 cursor-pointer hover:bg-gray-300 duration-300"
        >
          <div className="flex items-center">
            <span className="border rounded-full p-3 text-lg text-green-600 bg-green-100">
              <MdOutlineDone />
            </span>
            <span className="text-xl p-2">{permission.name}</span>
          </div>
          <div className="flex items-center text-center justify-center">
            <span className="text-xl p-3 text-center border m-1 text-blue-600 hover:bg-blue-200 rounded-full">
              <FaEdit />
            </span>
            <span
              onClick={() => deletItem(permission.id)}
              className="text-xl p-3 border m-1 text-red-600 hover:bg-red-200 rounded-full"
            >
              <RiDeleteBin2Fill />
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
