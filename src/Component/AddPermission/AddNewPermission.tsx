import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useStore } from "../../Store/Store";
export default function AddNewPermission() {
  const { addPermission } = useStore();
  const [Permission, setPermissions] = useState("");
  return (
    <div className="flex items-center px-5 bg-white rounded-md border-2">
      <span
        onClick={() => {
          const newPermission = { name: Permission, active: true };
          addPermission(newPermission);
          setPermissions("");
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
        placeholder="ساخت دسترسی جدید"
        className="bg-transparent focus:outline-none p-3"
      />
    </div>
  );
}
