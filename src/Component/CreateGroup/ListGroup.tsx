import React from "react";
import { CiBookmarkRemove } from "react-icons/ci";
export default function ListGroup() {
  return (
    <div className="w-full">
      <div>
        <h2 className="font-black border-b-2 p-2 mr-2 text-xl">
          :لیست گروه های موجود
        </h2>
        <div
          dir="rtl"
          className="flex items-center justify-between bg-gray-200 hover:bg-slate-300 duration-200 rounded-lg hover:text-white p-2 my-3 cursor-pointer"
        >
          <span className="p-2 text-xl">گروه الف</span>
          <span className="text-red-500 text-2xl hover:bg-red-100 duration-200 rounded-full p-3">
            <CiBookmarkRemove />
          </span>
        </div>
      </div>
    </div>
  );
}
