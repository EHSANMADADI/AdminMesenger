/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useStore } from "../../Store/Store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../../Config/api";
import Loader from "../Loader";
import loadLogin from'../../Image/loader/tail-spin.svg'

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loader, setLoader] = useState(false);
  const { username, setUsername, passwordUser, setPasswordUser, setActive } =
    useStore();
  const Loginfun = () => {
    setLoader(true);
    api
      .post("/Home/Login", { username: userName, password: password })
      .then((res) => {
        setUsername(userName);
        setPasswordUser(password);
        localStorage.setItem("username", userName);
        if (res.data.isAdmin && res.data.isCorrect) {
          setActive(true);
          navigate("/Admin");
        } else {
          Swal.fire({
            title: "شما اجازه ورود ندارید",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(userName, password);
        console.log(err);

        Swal.fire({
          title: "نام کاربری یا رمز عبور اشتباه است ",
          icon: "error",
        });
      });
  };

 

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
              value={userName}
              onChange={(e) => {
                let name = e.target.value;
                setUserName(name);
              }}
              placeholder="نام کاربری"
              className="border w-full  border-gray-400 rounded-lg px-4 py-2  focus:outline-none focus:border-blue-500"
              required
            />
            <div className="flex justify-between items-center mt-4 border bg-white w-full  border-gray-400 rounded-lg px-4 py-2  focus:outline-none focus:border-blue-500">
              <input
                value={password}
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
            {!loader && (
              <button
                onClick={Loginfun}
                className="mt-4 bg-green-700 w-full mx-auto text-white rounded-md px-4 py-2"
              >
                ورود
              </button>
            )}
            {loader &&( <button className="mt-4 flex items-center justify-center bg-green-700 w-full mx-auto text-white text-base font-bold rounded-md px-4 py-2">لطفا صبر کنید
                <span>
                  <img src={loadLogin} className="w-6 h-6 m-1"/>
                </span>
              </button>)
            }
          </form>
        </div>
      </div>
    </div>
  );
}
