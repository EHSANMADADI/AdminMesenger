/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../Store/Store";
import StorageType from "../AddPermission/StorageType";
import { MdDelete } from "react-icons/md";
import ListTypeStorageType from "../AddPermission/ListTypeStorageType";
import api from "../../Config/api";
import Swal from "sweetalert2";
import Loader from "../Loader";

export default function EditPermission() {
  const { PermissionList, setPermissionss, idTable, setIdTable,removeAllListTypeOfSave } = useStore();
  const { Id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [loading,setLoading]=useState(false)
  
  const selectedPermission = Id
    ? PermissionList.find((permission) => permission.id === parseInt(Id))
    : null;
    console.log('selected',selectedPermission);
    

  // استفاده از useState برای مدیریت مقدار input
  const [name, setName] = useState(selectedPermission?.name || "");
  const [updatedStorageList, setUpdatedStorageList] = useState(
    selectedPermission?.storageList || []
  );

  // handler برای مدیریت تغییرات input
  const handleInputChange = (e: any) => {
    setName(e.target.value);
  };

  // تابعی برای برگرداندن نوع ذخیره سازی بر اساس saveTypeId
  const getStorageName = (saveTypeId: number) => {
    switch (saveTypeId) {
      case 1:
        return"در سمت سرور:ذخیره نشود-در سمت کاربر:ذخیره نشود"
      case 2:
        return " در سمت سرور:ذخیره نشود-درسمت کاربر:ذخیره شود"
         
      case 3:
        return "در سمت سرور :ذخیره نشود - در سمت کاربر ذخیره شود با رمز گذاری متن";
      case 4:
        return "در سمت سرور :ذخیره نشود:- در سمت کاربر ذخیره شود با رمزگذاری کامل";
      case 5:
        return"در سمت سرور:ذخیره شود-در سمت کاربر:ذخیره نشود"
      case 6:
        return"در سمت سرور:ذخیره شود-در سمت کاربر:ذخیره شود"
      case 7:
        return"در سمت سرور:ذخیره شود-در سمت کاربر:ذخیره شود با رمزگذاری متن"
      case 8:
        return"در سمت سرور:ذخیره شود-در سمت کاربر:ذخیره شود با رمزگذاری کامل "
      case 9:
        return "در سمت سرور:ذخیره شود به همراه رمزگذاری متن-درسمت کاربر:ذخیره نشود";
      case 10:
        return "در سمت سرور:ذخیره شود به همراه رمزگذاری متن-درسمت کاربر:ذخیره شود";
      case 11:
        return "در سمت سرور:ذخیره شود به همراه رمزگذاری متن-در سمت کاربر:ذخیره شود به همراه رمزنگذاری متن";
      case 12:
        return "در سمت سرور:ذخیره شود به همراه رمزگذاری متن-در سمت کاربر:ذخیره شود به همراه رمزنگذاری کامل";
      case 13:
        return "در سمت سرور :ذخیره شود به همراه رمزگذاری کامل-در سمت کاربر :ذخیره نشود";
      case 14:
        return "در سمت سرور :ذخیره شود به همراه رمزگذاری کامل-در سمت کاربر :ذخیره شود";
      case 15:
        return "در سمت سرور :ذخیره شود به همراه رمزگذاری کامل-در سمت کاربر :ذخیره شود با رمزگذاری متن";
      case 16:
        return "در سمت سرور :ذخیره شود به همراه رمزگذاری کامل-در سمت کاربر :ذخیره شود با رمزگذاری کامل";
      default:
        return "هیچ کدوم نبود ):";
    }
  };

  const handleDelete = (index: number) => {
    if (!selectedPermission) return; // بررسی وجود پرمیژن انتخاب شده

    // حذف آیتم از storageList
    const newList = selectedPermission.storageList.filter(
      (_, i) => i !== index
    );

    // به‌روز رسانی PermissionList با storageList جدید
    const updatedPermission = {
      ...selectedPermission,
      storageList: newList,
    };

    // به‌روزرسانی PermissionList در Zustand
    setPermissionss(
      PermissionList.map((permission) =>
        permission.id === selectedPermission.id ? updatedPermission : permission
      )
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var saveTypeIds: number[] = [];

  const handelBTN = () => {
    setLoading(true);
    updatedStorageList.forEach((item) => {
      saveTypeIds.push(item.saveTypeId);
    });

    api
      .put(
        `/Admin/editPermission/${Id}`,
        {
          title: name,
          defaultSaveType: saveTypeIds[0],
          saveTypeIds: saveTypeIds.slice(1),
        },
        {
          headers: {
            userId: userId,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: "عملیات با موفقیت انجام شد",
          icon: "success",
        });
        removeAllListTypeOfSave()
        setLoading(false)
      })
      .catch((err) => {
        Swal.fire({
          title: err,
          icon: "error",
        });
        setLoading(false)
      });
  };

  // UseEffect برای اطمینان از تنظیم صحیح updatedStorageList
  useEffect(() => {
    if (selectedPermission && selectedPermission.storageList.length > 0) {
      setUpdatedStorageList(selectedPermission.storageList);
    }
  }, [selectedPermission]);

  useEffect(() => {
    if (idTable) {
      const newEntry = {
        saveTypeId: idTable,
        client: "clientValue", // مقادیر client و server را با مقادیر مناسب جایگزین کنید
        server: "serverValue",
      };
      setUpdatedStorageList((prevList) => [newEntry, ...prevList]);
    }
    return () => {
      setIdTable(0);
    };
  }, [idTable]);

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full h-screen flex p-5">
      {loading?(<Loader/>):(
          <div className="flex flex-wrap w-2/3 mx-auto justify-between image-bg-login max-h-full h-4/3 my-auto rounded-lg p-5 overflow-auto">
          <span
            onClick={() => {
              navigate("/Admin/AddPermission");
            }}
            className="text-black text-2xl p-2 rounded-full border cursor-pointer hover:bg-gray-300 duration-300 h-11"
          >
            <IoMdArrowRoundBack />
          </span>
          <div dir="rtl" className="flex flex-col p-5 border w-full my-2">
            <div className="flex">
              <label className="text-bold text-lg mx-2">نام دسترسی:</label>
              <input
                className="focus:border-none focus:outline-none bg-gray-50 font-black text-lg"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-2">
              <h3 className="font-bold text-xl p-2">
                انواع ذخیره سازی در این دسترسی:
              </h3>
  
              {selectedPermission && updatedStorageList.length > 0 ?(updatedStorageList.map((item, index) => {
                const storageName = getStorageName(item.saveTypeId);
  
                return (
                  <div
                    className={`border rounded-xl p-4 my-2 flex items-center justify-between ${
                      index === 0 ? "bg-gray-200" : ""
                    }`}
                    key={index}
                  >
                    <div className="flex items-center font-bold">
                      <span>{storageName}</span>
                    </div>
                    <span
                      onClick={() => {
                        handleDelete(index);
                      }}
                      className="text-red-500 text-lg cursor-pointer"
                    >
                      <MdDelete />
                    </span>
                  </div>
                );
              })):(<div>Loading..</div>)
              }
            </div>
          </div>
          <div dir="rtl" className="w-full flex justify-end mb-2">
            <StorageType />
          </div>
          <div dir="rtl" className="w-full">
            <ListTypeStorageType />
          </div>
          <div className="flex w-full mx-auto items-center">
            <button
              onClick={handelBTN}
              className="bg-green-600 px-3 py-5 rounded text-white font-black w-full my-5 hover:scale-75 duration-300"
              >
              ویرایش دسترسی
            </button>
          </div>
        </div>
      )}
    
    </div>
  );
}
