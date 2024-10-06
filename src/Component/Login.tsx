import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full h-screen flex">
      <div className="flex flex-col image-bg-login items-center justify-center  lg:w-1/4 w-2/3 mx-auto h-2/3 my-auto rounded-lg ">
        <div>
          <span className="text-9xl">
            <FaUsers />
          </span>
        </div>
        <div>
          <span className="font-semibold text-sm">
            برای ورود به سیستم اطلاعات درخواست شده را وارد نمایید
          </span>
        </div>

        <div className="mb-8 mt-10 w-10/12">
          <form
            className="flex   flex-col"
            dir="rtl"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="نام کاربری"
              className="border w-full  border-gray-400 rounded-lg px-4 py-2  focus:outline-none focus:border-blue-500"
              required
            />
            <div className="flex justify-between items-center mt-4 border bg-white w-full  border-gray-400 rounded-lg px-4 py-2  focus:outline-none focus:border-blue-500">
              <input
                className="w-full focus:outline-none border-none outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                placeholder="کلمه عبور"
                required
              />

              <span className="cursor-pointer">
                {showPassword ? (
                  <IoEyeOutline
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </span>
            </div>

            <button className="mt-4 bg-green-700 w-full mx-auto text-white rounded-md px-4 py-2">
              ورود
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
