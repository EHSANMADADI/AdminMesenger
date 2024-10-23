import React from "react";
import { CiBookmarkRemove } from "react-icons/ci";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";
export default function ListGroup() {
  const navigate=useNavigate()
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
          <div className="flex items-center ">
            <span onClick={()=>{navigate(`/Admin/EditGroup/${5}`)}} className="text-blue-500 text-2xl hover:bg-blue-100 duration-200 rounded-full p-3">
              <MdEditSquare />
            </span>
            <span className="text-red-500 text-2xl hover:bg-red-100 duration-200 rounded-full p-3">
              <CiBookmarkRemove />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
