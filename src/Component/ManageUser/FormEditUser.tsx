import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

export default function FormEditUser() {
  const [name, setName] = useState("احسان مددی");
  const [phoneNumber, setPhoneNumber] = useState("09126508968");

  return (
    <div dir="rtl" className="w-4/5">
      <Fade delay={100}>
        <h5 className="m-2 font-black text-xl border-b-2 p-2">ویرایش کاربر</h5>
      </Fade>

      <form className="p-5">
        <Fade delay={200}>
          <div className="mb-5">
            <label className="font-bold" htmlFor="name">
              نام و نام خانوادگی
            </label>
            <input
              className="w-full mt-3 py-2 px-5 border rounded-lg focus:outline-none"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                const val = e.target.value;
                setName(val);
              }}
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
              className="w-full mt-3 py-2 px-5 border rounded-lg focus:outline-none"
              type="text"
              id="telephone"
              name="telephone"
              pattern="^09[0-9]{9}$"
              value={phoneNumber}
              onChange={(e) => {
                const val = e.target.value;
                setPhoneNumber(val);
              }}
              inputMode="numeric"
              title="شماره تلفن باید با 09 شروع شده و 11 رقم باشد."
              required
            />
          </div>
        </Fade>

        <Fade delay={350}>
          <div className="mb-5">
            <span className="font-black mb-5">انواع دسترسی ها</span>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className="flex items-center ps-3">
                  <input
                    id="vue-checkbox-list"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="vue-checkbox-list"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                  >
                    دسترسی یک
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className="flex items-center ps-3">
                  <input
                    id="vue-checkbox-list"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="vue-checkbox-list"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                  >
                    دسترسی دو
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className="flex items-center ps-3">
                  <input
                    id="vue-checkbox-list"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="vue-checkbox-list"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                  >
                    دسترسی سه
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className="flex items-center ps-3">
                  <input
                    id="vue-checkbox-list"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="vue-checkbox-list"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                  >
                    دسترسی چهار
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </Fade>

        <Fade delay={500}>
          <label className="font-bold" htmlFor="picture">
            تصویر نمایه
          </label>
          <input
            className="border-dashed border-2 border-blue-300 p-10 rounded-lg my-2 bg-gray-200"
            type="file"
            placeholder="تصویر نمایه را انتخاب کنید"
          />
        </Fade>

        <Fade className="w-full">
          <div className="flex items-center justify-start">
            <label
              htmlFor="vue-checkbox-list"
              className=" py-3 ms-2 text-base font-black text-gray-900"
            >
              قطع کامل دسترسی کاربر
            </label>

            <input
              id="vue-checkbox-list"
              type="checkbox"
              className="w-5 h-5 mx-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </Fade>

        <Fade delay={600}>
          <button
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
