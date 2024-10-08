/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import { MdPersonSearch } from "react-icons/md";
import UserUi from "./UserUi";
export default function FormAddGroup() {
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
            className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none  focus:bg-white"
            id="group_name"
            type="text"
          />
        </div>

        <div className="flex items-center bg-white rounded border overflow-hidden">
          <span className="text-gray-700 text-3xl py-2 px-3">
            <MdPersonSearch />
          </span>
          <input
            className="py-2 px-3 bg-transparent focus:outline-none overflow-hidden"
            placeholder="جست و جو کاربران ..."
          />
        </div>
      </form>
      <div className="max-h-1/3 overflow-auto">
        <UserUi/>
      </div>
    </div>
  );
}
