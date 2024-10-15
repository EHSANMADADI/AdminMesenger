import React from "react";
import { useStore } from "../../Store/Store";
export default function ListTypeStorageType() {
  const { listTypeOfseve, removeListTypeOfseve } = useStore();
  return (
    <div>
      <h1 className="font-bold text-lg p-2 my-2">
        لیست انواع ذخیره سازی در این دسترسی:
      </h1>
      {listTypeOfseve.map((item, index) => {
        return (
          <div key={index} className="bg-white border rounded-lg my-2">
            <div className="flex justify-between items-center p-2">
              <span className="p-2 font-black">{item}</span>
              <button className="text-red-500 font-black m-1 hover:border-b-2 duration-200 hover:border-b-red-700" onClick={() => removeListTypeOfseve(index)}>حذف</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
