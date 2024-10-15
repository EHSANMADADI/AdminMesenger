import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useStore } from "../../Store/Store";
import api from "../../Config/api";
import Swal from "sweetalert2";
export default function AddNewPermission() {
  const { userId, addPermission } = useStore();
  const [Permission, setPermissions] = useState("");
  return (
    <div className="flex items-center px-5 bg-white rounded-md border-2">
      <span
        onClick={() => {
          const newPermission = Permission;
          console.log(Permission);
          console.log(userId);
          api
            .post(
              "/Admin/createPermission ",
              {
                title: newPermission,
                defaultSaveType: 4,
                saveTypeIds: [2, 3, 4],
              },
              {
                headers: {
                  userId: userId,
                },
              }
            )
            .then((response) => {
              Swal.fire({
                title: "دسترسی جدید اضافه شد",
                icon: "success",
              });
              console.log(response);
              setPermissions("");
              addPermission({ name: newPermission, active: true,id:response.data.id });
            })
            .catch((err) => {
              alert(err);
            });
        }}
        className="p-2 border rounded-full cursor-pointer hover:bg-green-500 text-xl hover:text-white duration-200"
      >
        <IoAdd />
      </span>
      <input
        type="text"
        value={Permission}
        onChange={(e) => {
          const vara = e.target.value;
          setPermissions(vara);
        }}
        placeholder="نام دسترسی جدید"
        className="bg-transparent focus:outline-none p-3"
      />
    </div>
  );
}
