/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../Config/api";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import PermissionUser from "../ManageUser/PermissionUser";
import UserUi from "../CreateGroup/UserUi";
interface Members {
  id: number;
  fullname: string;
  username: string;
  avatar: string;
  roleName: string;
  status: boolean;
  roleInChat: string;
}
export default function FormEditGroup() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [users, setUsers] = useState<Members[]>([]);
  const [admins, setAdmins] = useState<number[]>([]);
  
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
  console.log(users[0]);

  const navigate = useNavigate();
  const { GroupId } = useParams();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    api
      .get(`/Admin/getGroupMemberCount/${GroupId}`, {
        headers: {
          userId,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setName(res.data.fullname);
          console.log(res.data.fullname);
          setUserName(res.data.username);
          setUsers(res.data.members);
          setBio(res.data.bio);
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
          icon: "error",
        });

        navigate("/Admin/AddGroup");
      });
  }, []);

  const deleteItem = (id: number) => {
    Swal.fire({
      title: "آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف شود",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUser = users.filter((user) => user.id !== id);
        setUsers(updatedUser);
      }
    });
  };

  const HandelSend = () => {
    const formData = new FormData();
    formData.append("Fullname", name);
    formData.append("Username", userName);
    formData.append("Bio", bio);
    if (file) formData.append("Avatar", file);
    users.map((user) => formData.append("Members", user.id.toString()));
    const adminIds = users
      .filter((user) => user.roleInChat === "Admin_u")
      .map((user) => user.id);
    setAdmins(adminIds);
    adminIds.map((admin) => formData.append("Admins", admin.toString()));
    console.log("admins", adminIds);

    api
      .put(`/Admin/editGroup/${GroupId}`, formData, {
        headers: {
          userId,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        Swal.fire({
          title: "گروه با موفقیت ویرایش شد",
          icon: "success",
        });
        console.log(res);
        navigate("/Admin/AddGroup");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
          icon: "error",
        });
      });
  };
  return (
    <div dir="rtl" className="flex flex-end flex-col">
      <form
        className="p-5 md:w-4/6 w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg  font-bold mb-2"
            htmlFor="group_name"
          >
            عنوان گروه
          </label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none  focus:bg-white"
            id="group_name"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg  font-bold mb-2"
            htmlFor="group_name"
          >
            نام کاربری گروه
          </label>
          <input
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none  focus:bg-white"
            id="group_username"
            type="text"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg  font-bold mb-2"
            htmlFor="group_bio"
          >
            توضیحات
          </label>
          <textarea
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            id="group_bio"
            className="w-full h-20 focus:outline-none border rounded p-2"
            placeholder="توضیحات..."
          ></textarea>
        </div>

        <Fade className="my-3" delay={200}>
          <label className="font-bold" htmlFor="picture">
            تغییر تصویر نمایه
          </label>
          <input
            className="border-dashed border-2 border-blue-300 p-10 rounded-lg my-2
           bg-gray-200"
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={(e) => handelFileChange(e)}
          />
        </Fade>
        <Fade className="my-3" delay={220}>
          <div>
            <h3 className="font-bold text-lg">لیست کاربران گروه:</h3>
            {users.length === 0 ? (
              <div className="text-lg text-gray-600 p-2">
                این گروه کاربری ندارد
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-1 my-4">
                {users.map((user) => (
                  <div
                    className={`flex items-center space-x-2 border-2 justify-between p-2 rounded hover:bg-gray-200 duration-300 ${
                      user.roleInChat === "Admin_u"
                        ? "bg-blue-400 text-white"
                        : ""
                    }`}
                    key={user.id}
                  >
                    <img
                      className="md:w-10 md:h-10 w-5 h-5 rounded-full border-double border-green-300 border-2"
                      src={`https://195.191.45.56:5155/uploads/${user.avatar}`}
                      alt="User Avatar"
                    />
                    <div className="flex items-center ">
                      <span className="font-bold">{user.fullname}</span>
                      {user.roleInChat === "Admin_u" && (
                        <>
                          <span className="text-xs mx-3 border-b">Admin</span>
                          {/* <span className="text-sm">
                        <IoPerson />
                      </span> */}
                        </>
                      )}
                    </div>

                    <span
                      onClick={() => deleteItem(user.id)}
                      className="text-red-600 cursor-pointer hover:text-white text-lg border rounded-full p-2 border-red-400 hover:bg-red-400 duration-200"
                    >
                      <MdDeleteForever />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Fade>

        <div>
          <PermissionUser Id={GroupId} />
        </div>
        

        <div className="flex w-full justify-start items-center mt-5 ">
          <button
            onClick={HandelSend}
            className=" bg-green-500 text-white text-lg rounded md:w-1/2 w-full px-5 py-3 hover:bg-green-700 hover:scale-110 duration-300 "
          >
            ثبت
          </button>
        </div>
      </form>
    </div>
  );
}
