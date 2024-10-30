/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useStore } from "../../Store/Store";
import { Fade } from "react-awesome-reveal";
import api from "../../Config/api";
import UserUiList from "./UserUiList";
import loadLogin from "../../Image/loader/tail-spin.svg";
import Swal from "sweetalert2";
import UserUi from "./UserUi";
interface User {
  id: number;
  avatar: string;
  fullname: string;
  username: string;
}
export default function FormAddGroup() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]); // تعریف نوع آرایه به صورت رشته‌ای
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
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
  const userId = localStorage.getItem("userId");
  const [iscreateGroup, setIscreateGroup] = useState(false);
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [permissionName,setPermissionName]=useState<string[]>([])
  const {
    adminList,
    Members,
    removeAllMembers,
    removeAllAdminList,
    PermissionList,
    setPermissionss,
  } = useStore();
  const createGroup = () => {
    const userId = localStorage.getItem("userId");
    if (name && userName) {
      const formData = new FormData();
      formData.append("Fullname", name);
      formData.append("Username", userName);
      Members.map((member) => formData.append("Members", member.toString()));
      adminList.map((admin) => formData.append("Admins", admin.toString()));
      formData.append("Bio", bio);
      if (file) formData.append("Avatar", file);
      setIsCreateGroup(true);
      permissionName.map((item) => formData.append("Permission", item.toString()));
      console.log(['permissionGroup',permissions]);
      
      console.log(formData);

      api
        .post("/Admin/createGroup", formData, {
          headers: {
            userId,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setIsCreateGroup(false);
          Swal.fire({
            title: "گروه با موفقیت ساخته شد",
            icon: "success",
          });
          setBio("");
          setFile(null);
          setName("");
          setUserName("");
          removeAllMembers();
          removeAllAdminList();
        })
        .catch((err) => {
          setIsCreateGroup(false);
          Swal.fire({
            title: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
            icon: "error",
          });
        });
    }
  };

  useEffect(() => {
    if (PermissionList.length > 0) {
      setIsLoading(false);
    }
    console.log("permissionList", permissions);

    api
      .post(
        "/Admin/UsersByPermissions",
        permissions, // ارسال آرایه‌ای از `id`ها بدون نام
        {
          headers: {
            userId,
          },
        }
      )
      .then((response) => {
        console.log("UserByPermission", response.data);
        if (response.data && response.data.users) {
          setUsers(response.data.users);
        } else if (response.data) {
          const upUser = [];
          for (const item of response.data) {
            if (item.users) {
              upUser.push(...item.users); // اضافه کردن کاربران به upUser
            }
          }
          setUsers(upUser);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [permissions]);

  const handlePermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const value = event.target.value;
  
    // بروزرسانی لیست پرمیژن‌ها
    setPermissions(
      event.target.checked
        ? [...permissions, value]  // اگر تیک خورده باشد، آن را اضافه کن
        : permissions.filter((permission) => permission !== value)  // در غیر این صورت، آن را حذف کن
    );
  
    // بروزرسانی نام‌های پرمیژن
    setPermissionName((prevPermissionNames) => {
      if (event.target.checked) {
        return [...prevPermissionNames, name]; // اگر تیک خورده باشد، آن را اضافه کن
      } else {
        return prevPermissionNames.filter((permName) => permName !== name); // اگر تیک برداشته شد، آن را حذف کن
      }
    });
  };
  

  useEffect(() => {
    api
      .get("/Admin/listPermissions", {
        headers: {
          userId: userId,
        },
      })
      .then((response) => {
        console.log(response.data);
        const newListPermission = response.data.map(
          (item: { title: string; permissionId: number }) => {
            return { name: item.title, active: true, id: item.permissionId };
          }
        );
        setPermissionss(newListPermission);
      });
  }, []);
  return (
    <div dir="rtl" className="flex flex-end flex-col">
      {isLoading ? ( // نمایش لودر در صورت لود شدن لیست پرمیژن‌ها
        <div className="flex justify-center items-center h-full">
          <img src={loadLogin} alt="loading" className="w-10 h-10" />
        </div>
      ) : (
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
          <div>
            <Fade delay={350}>
              <div className="mb-5">
                <span className="font-black text-lg">انواع دسترسی ها</span>
                <div className="grid mt-3 grid-cols-1 sm:grid-cols-4 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                  {PermissionList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className=" border-gray-200 sm:border-b sm:border-r text-lg"
                      >
                        <div className="flex items-center ps-3">
                          <input
                            id={item.name}
                            type="checkbox"
                            value={item.id}
                            onChange={(e)=>handlePermissionChange(e,item.name)} // تابع برای تغییر دسترسی
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor={item.name}
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                          >
                            {item.name}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Fade>
          </div>

          <div className="max-h-1/3 w-full overflow-auto grid grid-cols-2 my-3">
            {users.map((user) => {
              return (
                <UserUi
                  fullname={user.fullname}
                  avatar={user.avatar}
                  id={user.id}
                />
              );
            })}
          </div>

          <Fade className="my-3" delay={200}>
            <label className="font-bold" htmlFor="picture">
              تصویر نمایه
            </label>
            <input
              className="border-dashed border-2 border-blue-300 p-10 rounded-lg my-2
           bg-gray-200"
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={(e) => handelFileChange(e)}
              required
            />
          </Fade>
          {iscreateGroup && (
            <button
              disabled
              className="bg-green-600 border-none flex items-center justify-center outline-none rounded text-white mt-4 px-5 py-3 w-full mx-auto hover:scale-105 hover:bg-green-700 duration-200"
            >
              <span>لطفا صبر کنید</span>
              <span>
                <img src={loadLogin} className="w-6 h-6 m-1" />
              </span>
            </button>
          )}
          {!iscreateGroup && (
            <button
              type="submit"
              onClick={createGroup}
              className="bg-green-600 border-none outline-none rounded text-white mt-4 px-5 py-3 w-full mx-auto hover:scale-105 hover:bg-green-700 duration-200"
            >
              ساخت گروه
            </button>
          )}
        </form>
      )}
    </div>
  );
}
