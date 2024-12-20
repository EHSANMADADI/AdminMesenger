import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AddNewPermission from "./AddNewPermission";
export default function AddPermission() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full h-screen flex">
      <div className="flex flex-wrap w-2/3 mx-auto justify-between image-bg-login max-h-full h-4/3 my-auto rounded-lg  p-5 overflow-auto ">
        <span
          onClick={() => {
            navigate("/Admin");
          }}
          className="text-black text-2xl p-2 rounded-full border cursor-pointer hover:bg-gray-300 duration-300 h-11"
        >
          <IoMdArrowRoundBack/>
        </span>

        <div dir="rtl" className=" w-5/6">
          <h3 className="text-gray-700 m-2 border-b-2 font-black text-xl p-1 mb-2">
            تایین دسترسی
          </h3>
          <p className="text-gray-500 p-4 font-bold text-lg">
            شما در این بخش میتوانید بینهایت دسترسی را برای کاربران خود ایجاد
            کنید
          .این عمل برای حفظ محرمانگی شما تایین شده است دقت داشته باشید انتخاب سطح دسترسی اجباری نیست و میتواند تایین نگردد
          </p>
          <div>
            <AddNewPermission/>
          </div>
          
        </div>
      </div>
    </div>
  );
}
