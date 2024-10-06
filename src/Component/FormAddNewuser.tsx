import React from "react";
import { Fade } from "react-awesome-reveal";

export default function FormAddNewuser() {
  return (
    <div dir="rtl" className="w-4/5">
      <Fade delay={100}>
        <h5 className="m-2 font-black border-b-2 p-2">ثبت کاربر جدید</h5>
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

        <Fade delay={400}>
          <div className="mb-5">
            <label className="font-bold" htmlFor="username">
           نام کاربری 

            </label>
            <input
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
              className="w-full mt-3 py-2 px-5 border rounded-lg focus:outline-none"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
        </Fade>

        <Fade delay={500}>
            <button className="bg-green-500 text-lg font-black px-8 rounded-2xl text-gray-200 hover:bg-green-700 hover:scale-105 duration-300 py-3" type="submit">ثبت</button>
        </Fade>
      </form>
    </div>
  );
}
