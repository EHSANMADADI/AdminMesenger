import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FcSearch } from "react-icons/fc";
export default function Search() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full h-screen  flex p-5">
      <div className="flex flex-wrap w-2/3 mx-auto justify-between image-bg-login max-h-full h-4/3 my-auto rounded-lg  p-5 overflow-auto ">
        <span
          onClick={() => {
            navigate("/Admin");
          }}
          className="text-black text-2xl p-2 rounded-full border cursor-pointer hover:bg-gray-300 duration-300 h-11"
        >
          <IoMdArrowRoundBack />
        </span>
        <Fade className="w-11/12 pb-5" delay={200}>
          <div
            dir="rtl"
            className="w-full flex items-center bg-white rounded-xl md:p-6 p-3 border border-gray-300"
          >
            <span className="text-3xl ml-2">
              <FcSearch />
            </span>
            <input
              placeholder=" عبارت مورد نظر خود را وارد کنید"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
        </Fade>
        <Fade delay={300} className="w-full">
          <div className="flex items-center justify-between mb-10 pb-32 mx-4">
            <div className="flex bg-gray-200 border-none rounded-2xl items-center px-5 py-2 text-base font-black ">
              <input
                id="access-one"
                type="checkbox"
                value=""
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="access-one"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
              >
                جست و جو در کاربر ها
              </label>
            </div>
            <div className="flex bg-gray-200 border-none rounded-2xl items-center px-5 py-2 text-base font-black">
              <input
                id="access-one"
                type="checkbox"
                value=""
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="access-one"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
              >
                IDجست و جو در
              </label>
            </div>
            <div className="flex bg-gray-200 border-none rounded-2xl items-center px-5 py-2 text-base font-black">
              <input
                checked
                id="access-one"
                type="checkbox"
                value=""
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="access-one"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
              >
                جست و جو در محتوای چت ها
              </label>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
