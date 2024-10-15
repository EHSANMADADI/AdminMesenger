import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import api from "../../Config/api";
import Swal from "sweetalert2";
import { useStore } from "../../Store/Store";
export default function FormAddNewuser() {
  const { userId, PermissionList, addPermission, setPermissionss } = useStore();
  const [fullName, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]); // تعریف نوع آرایه به صورت رشته‌ای
  const [file, setFile] = useState<File | null>(null);
  const handlePermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (event.target.checked) {
      // اگر تیک خورده باشد، مقدار به آرایه اضافه می‌شود
      setPermissions([...permissions, value]);
    } else {
      // اگر تیک برداشته شود، مقدار از آرایه حذف می‌شود
      setPermissions(permissions.filter((permission) => permission !== value));
    }
  };

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

  const CreateUser = () => {
    const formData = new FormData();

    // اضافه کردن مقادیر به formData
    formData.append("fullName", fullName);
    formData.append("mobile", mobile);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("isAdmin", isAdmin.toString()); // تبدیل boolean به string// تبدیل boolean به string
    formData.append("permissions", JSON.stringify(permissions)); // تبدیل آرایه به string
    if (file) {
      formData.append("avatar", file); // اضافه کردن فایل به formData
    }
    api
      .post("/Admin/createuser", formData, {
        headers: {
          userId,
          "Content-Type": "multipart/form-data", // مشخص کردن نوع محتوا
        },
      })
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "کاربر با موفقیت ایجاد شد",
          icon: "success",
        });
        setFullname('')
        setFile(null);
        setIsAdmin(false);
        setMobile('');
        setUsername('')
        setPassword('')
        setPermissions([])
      })
      .catch((error) => {
        console.log("created User error=>", error);
        if(error.status==409){
          Swal.fire({
            title: "این کاربر وجود دارد",
            icon: "warning",
          });
        }
        else{
          Swal.fire({
            title: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
            icon: "error",
          });
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
    <div dir="rtl" className="w-4/5">
      <Fade delay={100}>
        <h5 className="m-2 font-black text-xl border-b-2 p-2">
          ثبت کاربر جدید
        </h5>
      </Fade>

      <form
        className="px-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Fade delay={200}>
          <div className="mb-5">
            <label className="font-bold" htmlFor="name">
              نام و نام خانوادگی
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full mt-3 py-2 px-5 border rounded-lg focus:outline-none"
              type="text"
              id="name"
              name="name"
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
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full mt-3 py-2 px-5 border rounded-lg focus:outline-none"
              type="number"
              id="telephone"
              name="telephone"
              pattern="^09[0-9]{9}$"
              inputMode="numeric"
              title="شماره تلفن باید با 09 شروع شده و 11 رقم باشد."
              required
            />
          </div>
        </Fade>

        <Fade delay={350}>
          <div className="mb-5">
            <span className="font-black">انواع دسترسی ها</span>
            <div className="grid mt-3 grid-cols-1 sm:grid-cols-4 gap-4 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {PermissionList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" border-gray-200 sm:border-b-0 sm:border-r"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        id={item.name}
                        type="checkbox"
                        value={item.name}
                        onChange={handlePermissionChange} // تابع برای تغییر دسترسی
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

        <Fade delay={380}>
          <div className="mb-5 flex items-center text-center">
            <label
              className="font-bold border-red-500 text-lg border-b-2"
              htmlFor="isAdmin"
            >
              آیا این کاربر ادمین باشد؟
            </label>
            <input
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="mx-5 w-4 h-5"
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
            />
          </div>
        </Fade>

        <Fade delay={400}>
          <div className="mb-5">
            <label className="font-bold" htmlFor="username">
              نام کاربری
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-3 py-2 px-5 border rounded-lg focus:outline-none"
              type="text"
              id="username"
              name="username"
              required
            />
          </div>
        </Fade>

        <Fade delay={450}>
          <div className="mb-5">
            <label className="font-bold" htmlFor="password">
              رمز عبور
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-3 py-2 px-5 border rounded-lg focus:outline-none"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
        </Fade>

        <Fade delay={500}>
          <label className="font-bold" htmlFor="picture">
            تصویر نمایه
          </label>

          <input
            className="border-dashed border-2 border-blue-300 p-10 rounded-lg my-2
           bg-gray-200"
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={(e) => handelFileChange(e)}
          />
        </Fade>

        <Fade delay={500}>
          <button
            onClick={CreateUser}
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
