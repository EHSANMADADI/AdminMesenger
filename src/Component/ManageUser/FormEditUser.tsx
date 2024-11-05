/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";
import noneAvatar from "../../Image/none.jpg";
import api from "../../Config/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PermissionUser from "./PermissionUser";

export default function FormEditUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(true); ///false=ban true=Ok
  const [admin, setAdmin] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const location = useLocation();
  const { userData } = location.state;
  const userId = localStorage.getItem("userId");
  const {userIds} =useParams()
  console.log('userIds',userIds);
  
  useEffect(() => {
    console.log(userData);
    if (userData) {
      setName(userData.fullname || ""); // اگر داده‌ها موجود باشند، تنظیم می‌شوند
      setPhoneNumber(userData.mobile || "");
      setUsername(userData.username || "");
      setPassword(userData.password || "");
      setStatus(userData.status);
      if (userData.roleName === "Super_a" || userData.roleName === "Admin_u") {
        setAdmin(true);
      }
    }
  }, [userData]);




  const handelFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files; // selectedFiles از نوع FileList است
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0]; // اولین فایل از FileList را انتخاب کنید
      if (
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg" ||
        selectedFile.type === "image/png"
      ) {
        setFile(selectedFile); // فایل را در استیت قرار دهید
      } else {
        alert("فقط فایل‌های jpg، jpeg و png مجاز هستند.");
      }
    }
  };

  const EditUser = () => {
    const formData = new FormData();

    // اضافه کردن مقادیر به formData
    formData.append("fullName", name);
    formData.append("mobile", phoneNumber);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("isActive", status.toString());
    formData.append("isAdmin", admin.toString());
    if (file) {
      formData.append("avatar", file); // اضافه کردن فایل به formData
    }
    const storedPermissions = JSON.parse(
      sessionStorage.getItem("userPermissions") || "[]"
    );
    storedPermissions.map((item: any) =>
      formData.append("Permission", item.title)
    );
    console.log('storedPermissions Sended',storedPermissions);
    

    api
      .put(`/Admin/editUser/${userData.id}`, formData, {
        headers: {
          userId,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        
        Swal.fire({
          title: "کاربر با موفقیت ویرایش شد",
          icon: "success",
        });
        navigate("/Admin/ManageUser");
      })
      .catch((err) => {
        Swal.fire({
          title: "err",
          icon: "error",
        });
      });
  };

  return (
    <div dir="rtl" className="w-4/5">
      <Fade delay={100}>
        <h5 className="m-2 font-black text-xl border-b-2 p-2">ویرایش کاربر</h5>
      </Fade>
      <div className="flex w-full justify-end">
        {userData.avatar ? (
          <img
            className="m-2 w-24 h-24 ml-auto border-2 bg-gray-300 border-gray-400"
            src={`https://195.191.45.56:5155/uploads/${userData.avatar}`}
          />
        ) : (
          <img
            className="m-2 w-24 h-24 ml-auto border-2 bg-gray-300 border-gray-400"
            src={noneAvatar}
          />
        )}
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="p-5">
        <Fade delay={200}>
          <div className="mb-5">
            <label className="font-bold" htmlFor="name">
              نام و نام خانوادگی
            </label>
            <input
              className="w-full mt-3 py-2 px-5 border rounded-lg focus:outline-none"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                const val = e.target.value;
                setName(val);
              }}
              required
            />
          </div>
        </Fade>

        <Fade delay={300}>
          <div className="mb-5">
            <label className="font-bold mt-5" htmlFor="telephone">
              تلفن همراه
            </label>
            <input
              className="w-full mt-3 py-2 px-5 border rounded-lg focus:outline-none"
              type="text"
              id="telephone"
              name="telephone"
              pattern="^09[0-9]{9}$"
              value={phoneNumber}
              onChange={(e) => {
                const val = e.target.value;
                setPhoneNumber(val);
              }}
              inputMode="numeric"
              title="شماره تلفن باید با 09 شروع شده و 11 رقم باشد."
              required
            />
          </div>
        </Fade>

        
        <Fade delay={400}>
          <div className="mb-5">
            <label className="font-bold mt-5" htmlFor="password">
              رمز عبور
            </label>
            <input
              className="w-full mt-3 py-2 px-5 border rounded-lg focus:outline-none"
              type="text"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                const val = e.target.value;
                setPassword(val);
              }}
            />
          </div>
        </Fade>
        <Fade delay={410}>
          <div className="mb-5">
            <label className="font-bold mt-5" htmlFor="username">
              نام کاربری
            </label>
            <input
              className="w-full mt-3 py-2 px-5 border rounded-lg focus:outline-none"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {
                const val = e.target.value;
                setUsername(val);
              }}
              required
            />
          </div>
        </Fade>

        <Fade delay={500}>
          <label className="font-bold" htmlFor="picture">
            انتخاب تصویر نمایه جدید
          </label>
          <input
            className="border-dashed border-2 border-blue-300 p-10 rounded-lg my-2 bg-gray-200"
            type="file"
            placeholder="تصویر نمایه را انتخاب کنید"
            accept=".jpg, .png, .jpeg"
            onChange={(e) => handelFileChange(e)}
          />
        </Fade>
        <div className="flex items-center">
          <Fade className="w-full">
            <div className="flex items-center justify-start">
              <label
                htmlFor="vue-checkbox-list"
                className=" py-3 ms-2 text-base font-black text-gray-900"
              >
                قطع کامل دسترسی کاربر
              </label>

              <input
                id="vue-checkbox-list"
                type="checkbox"
                checked={!status}
                onChange={(e) => {
                  setStatus(!e.target.checked);
                }}
                className="w-5 h-5 mx-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </Fade>
          <Fade className="w-full">
            <div className="flex items-center justify-start">
              <label
                htmlFor="vue-checkbox-list"
                className=" py-3 ms-2 text-base font-black text-gray-900"
              >
                ادمین
              </label>

              <input
                id="vue-checkbox-list"
                type="checkbox"
                checked={admin}
                onChange={(e) => {
                  setAdmin(e.target.checked);
                }}
                className="w-5 h-5 mx-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </Fade>
        </div>
        <Fade delay={580}>
          <div>
            <PermissionUser Id={userIds} showAdduser={false} />
          </div>
        </Fade>

        <Fade delay={600}>
          <button
            onClick={EditUser}
            className="bg-green-500 text-lg font-black px-8 rounded-2xl text-gray-200 hover:bg-green-700 hover:scale-105 duration-300 py-3"
            type="submit"
          >
            ثبت
          </button>
        </Fade>
      </form>
    </div>
  );
}
