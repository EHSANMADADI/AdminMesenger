/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useStore } from "../../Store/Store";
import { MdPersonSearch } from "react-icons/md";
import UserUi from "./UserUiList";
import { Fade } from "react-awesome-reveal";
import api from "../../Config/api";
import UserUiList from "./UserUiList";
import loadLogin from "../../Image/loader/tail-spin.svg";
import Swal from "sweetalert2";
export default function FormAddGroup() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
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
  const [iscreateGroup, setIscreateGroup] = useState(false);
  

  const { adminList,Members } = useStore();
  const createGroup = () => {
    const userId = localStorage.getItem("userId");
    if (name && userName) {
      const formData = new FormData();
      formData.append("Fullname", name);
      formData.append("Username", userName);
      Members.map((member)=>{
       return formData.append("Members", member.toString());
      })
      adminList.map((admin)=>(formData.append("Admins",admin.toString())))
      
    
      formData.append("Bio", bio);
      if (file) {
        formData.append("Avatar", file); // اضافه کردن فایل به formData
      }
      setIscreateGroup(true);
      console.log(formData);
      
      api
        .post("/Admin/createGroup", formData, {
          headers: {
            userId,
            "Content-Type": "multipart/form-data", // مشخص کردن نوع محتوا
          },
        })
        .then((res) => {
          console.log(res);
          setIscreateGroup(false);
          Swal.fire({
            title:'گروه با موفقیت ساخته شد',
            icon:'success'
          })
        })
        .catch((err) => {
          console.log(err);
          setIscreateGroup(false);
          Swal.fire({
            title:'مشکلی پیش آمده لطفا دوباره تلاش کنید',
            icon:'error'

          })
        });
    }
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

       

        <div className="max-h-1/3 w-full overflow-auto my-3">
          <UserUiList />
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
    </div>
  );
}
