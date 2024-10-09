import React from "react";
import { MdOutlineDone } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";

export default function ListPermission() {
  return (
    <div className="flex justify-between items-center border-2 my-3 rounded-md bg-white p-1 cursor-pointer hover:bg-gray-300 duration-300">
      <div className="flex items-center">
        <span className="border rounded-full p-3 text-lg text-green-600 bg-green-100">
          <MdOutlineDone />
        </span>
        <span className="text-xl p-2"> دسترسی بخش امنیت</span>
      </div>
      <div className="flex items-center">
        <span className="text-xl p-3 border m-1 text-red-600 hover:bg-red-200 rounded-full">
          <RiDeleteBin2Fill />
        </span>
      </div>
    </div>
  );
}
