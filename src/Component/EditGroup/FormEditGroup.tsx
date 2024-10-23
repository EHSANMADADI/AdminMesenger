import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

export default function FormEditGroup() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const[bio,setBio] = useState("");
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
        
      </form>
    </div>
  );
}
