import React, { useEffect } from "react";
import { useStore } from "../../Store/Store";

export default function ListTypeStorageType() {
  const { listTypeOfseve, removeListTypeOfseve,removeSaveTypeIds } = useStore();
  console.log(listTypeOfseve);
  return (
    <div>
      <h1 className="font-bold text-lg p-2 my-2">
        لیست انواع ذخیره سازی جدید در این دسترسی:
      </h1>
      {listTypeOfseve && listTypeOfseve.length > 0 ? (
        listTypeOfseve.map((item, index) => (
          <div key={index} className="bg-white border rounded-lg my-2">
            <div className="flex justify-between items-center p-2">
              <span className="p-2 font-black">{item}</span>
              <button
                className="text-red-500 font-black m-1 hover:border-b-2 duration-200 hover:border-b-red-700"
                onClick={() => {
                  const saveTypeId = parseInt(listTypeOfseve[index], 10); // تبدیل به عدد
                  if (!isNaN(saveTypeId)) { // بررسی معتبر بودن عدد
                    removeListTypeOfseve(index); // حذف با ایندکس
                    removeSaveTypeIds(saveTypeId); // حذف بر اساس شناسه
                  } else {
                    console.error("Invalid saveTypeId");
                  }
                }}
              >
                حذف
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex font-bold text-gray-600 border-b-2 p-4">
          هنوز نوعی تعیین نکرده‌اید
        </div>
      )}
    </div>
  );
}
