/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Config/api";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import PermissionUser from "../ManageUser/PermissionUser";
import { useStore } from "../../Store/Store";
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
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    userId: number | null;
  }>({ x: 0, y: 0, userId: null });


  const navigate = useNavigate();
  const { GroupId } = useParams();
  const userId = localStorage.getItem("userId");
  const {Members,removeAllMembers}=useStore()







  useEffect(() => {
    api
      .get(`/Admin/getGroupMemberCount/${GroupId}`, { headers: { userId } })
      .then((res) => {
        if (res.data) {
          setName(res.data.fullname);
          setUserName(res.data.username);
          setUsers(res.data.members);
          setBio(res.data.bio);
        }
      })
      .catch(() => {
        Swal.fire({
          title: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
          icon: "error",
        });
        navigate("/Admin/AddGroup");
      });
  }, []);
 

  const handleContextMenu = (e: React.MouseEvent, userId: number) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, userId });
  };

  const toggleAdmin = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              roleInChat: user.roleInChat === "Admin_u" ? "Member" : "Admin_u",
            }
          : user
      )
    );
    setContextMenu({ ...contextMenu, userId: null });
  };

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

  const handelFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      if (
        ["image/jpeg", "image/jpg", "image/png"].includes(selectedFile.type)
      ) {
        setFile(selectedFile);
      } else {
        alert("فقط فایل‌های jpg، jpeg و png مجاز هستند.");
      }
    }
  };

  const HandelSend = () => {
    const formData = new FormData();
    formData.append("Fullname", name);
    formData.append("Username", userName);
    formData.append("Bio", bio);
    if (file) formData.append("Avatar", file);
    
    users.forEach((user) => formData.append("Members", user.id.toString()));
    console.log(Members);
    
    Members.forEach((member) => formData.append("Members", member.toString()))
    const adminIds = users
      .filter((user) => user.roleInChat === "Admin_u")
      .map((user) => user.id);
    setAdmins(adminIds);
    adminIds.forEach((admin) => formData.append("Admins", admin.toString()));
    console.log("formDat You send", formData);

    api
      .put(`/Admin/editGroup/${GroupId}`, formData, {
        headers: { userId, "Content-Type": "multipart/form-data" },
      })
      .then(() =>
        Swal.fire({ title: "گروه با موفقیت ویرایش شد", icon: "success" }),
     
      )
      .catch(() =>
        Swal.fire({
          title: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
          icon: "error",
        })
       
      ).finally(()=>removeAllMembers())
  };

  return (
    <div dir="rtl" className="flex flex-end flex-col">
      <form
        className="p-5 md:w-4/6 w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="group_name"
          >
            عنوان گروه
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white"
            id="group_name"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="group_username"
          >
            نام کاربری گروه
          </label>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white"
            id="group_username"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="group_bio"
          >
            توضیحات
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
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
            className="border-dashed border-2 border-blue-300 p-10 rounded-lg my-2 bg-gray-200"
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={(e) => handelFileChange(e)}
          />
        </Fade>

        <Fade className="my-3" delay={220}>
          <h3 className="font-bold text-lg">لیست کاربران گروه:</h3>
          {users.length === 0 ? (
            <div className="text-lg text-gray-600 p-2">
              این گروه کاربری ندارد
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-1 my-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  onContextMenu={(e) => handleContextMenu(e, user.id)}
                  className={`flex items-center space-x-2 border-2 justify-between p-2 rounded hover:bg-gray-200 duration-300 ${
                    user.roleInChat === "Admin_u"
                      ? "bg-blue-400 text-white"
                      : ""
                  }`}
                >
                  <img
                    className="md:w-10 md:h-10 w-5 h-5 rounded-full border-double border-green-300 border-2"
                    src={`https://195.191.45.56:5155/uploads/${user.avatar}`}
                    alt="User Avatar"
                  />
                  <div className="flex items-center ">
                    <span className="font-bold">{user.fullname}</span>
                    {user.roleInChat === "Admin_u" && (
                      <span className="text-xs mx-3 border-b">Admin</span>
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
        </Fade>

        {contextMenu.userId !== null && (
          <div
            style={{
              position: "absolute",
              top: contextMenu.y,
              left: contextMenu.x,
              background: "white",
              border: "1px solid black",
              borderRadius: "4px",
            }}
          >
            <button onClick={() => toggleAdmin(contextMenu.userId!)}>
              تغییر وضعیت ادمین
            </button>
          </div>
        )}
        <div>
          <PermissionUser Id={GroupId} />
        </div>

        <div className="flex w-full justify-start items-center mt-5 ">
          <button
            onClick={HandelSend}
            className="bg-green-500 text-white text-lg rounded md:w-1/2 w-full px-5 py-3 hover:bg-green-700 hover:scale-110 duration-300 "
          >
            ثبت
          </button>
        </div>
      </form>
    </div>
  );
}
