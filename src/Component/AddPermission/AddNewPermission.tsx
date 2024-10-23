import React, { useState } from "react";
import { useStore } from "../../Store/Store";
import api from "../../Config/api";
import Swal from "sweetalert2";
import StorageType from "./StorageType";
import ListTypeStorageType from "./ListTypeStorageType";
import ListPermission from "./ListPermission";
import Loader from "../Loader";
export default function AddNewPermission() {
  const {
    addPermission,
    saveTypeIds,
    defaultSaveType,
    removeAllSaveTypeIds,
    removeAllListTypeOfSave,
    setDefaultSaveType,
  } = useStore();
  const userId = localStorage.getItem("userId");
  const [Permission, setPermissions] = useState("");
  const [loading, setLoading] = useState(false);
  const addNew = () => {
    if (Permission !== "") {
      setLoading(true);
      const newPermission = Permission;
      console.log(Permission);
      api
        .post(
          "/Admin/createPermission",
          {
            title: newPermission,
            defaultSaveType: defaultSaveType,
            saveTypeIds: saveTypeIds,
          },
          {
            headers: {
              userId: userId,
            },
          }
        )
        .then((response) => {
          Swal.fire({
            title: "دسترسی جدید اضافه شد",
            icon: "success",
          });
          removeAllListTypeOfSave();
          console.log(response);
          setPermissions("");
          addPermission({
            name: newPermission,
            active: true,
            id: response.data.id,
            storageList: response.data.saveTypes || [], // تغییر به storageList
            defalt: defaultSaveType,
          });
          removeAllSaveTypeIds();
          setDefaultSaveType(0);
          setLoading(false);
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    } else {
      Swal.fire({
        title: "لطفا نام دسترسی را وارد نمایید",
        icon: "warning",
      });
    }
  };
  return (
    <>
      {!loading ? (
        <div>
          <div className="flex items-center px-5 bg-white rounded-md border-2">
            <input
              type="text"
              value={Permission}
              onChange={(e) => {
                const vara = e.target.value;
                setPermissions(vara);
              }}
              placeholder="نام دسترسی جدید"
              className="bg-transparent focus:outline-none p-3"
            />
          </div>
          <p className="text-gray-500 p-2 border-b font-bold text-lg">
            در این قسمت شما میتوانید نوع ذخیره سازی پیام را در هر دسترسی تاییین
            کنید
          </p>
          <p className="text-gray-500 p-2 border-b font-bold text-lg">
            هر دسترسی یک نوع ذخیره سازی پیشفرض و دارد و میتواند چندیدن نوع ذخیره
            سازی دیگر هم به عنوان آپشن داشته باشد
          </p>
          <StorageType />

          <div className="border-t-4 mt-3  borfer-b-4">
            <ListTypeStorageType />
          </div>
          <div className="flex w-3/4 mx-auto justify-center items-center my-4">
            <button
              onClick={addNew}
              className="bg-green-500 hover:bg-green-700 duration-300 text-white p-5 rounded w-4/5 text-xl font-black"
            >
              {" "}
              ثبت دسترسی
            </button>
          </div>

          <div className="border-t-4 mt-4">
            <h3 className="text-2xl font-black p-2 my-2">
              لیست دسترسی های موجود:
            </h3>
            <ListPermission />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
