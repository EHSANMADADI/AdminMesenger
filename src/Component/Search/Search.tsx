/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FcSearch } from "react-icons/fc";
import api from "../../Config/api";
import bgUser from "../../Image/none.jpg";
import { FaExternalLinkAlt } from "react-icons/fa";
import Loader from "../Loader";
interface User {
  id: number;
  avatar: string;
  fullname: string;
  username: string;
  roleName: string;
  mobile: string;
}

interface Message {
  id: number;
  content: string;
  sender: string;
  isFiles: boolean;
  userContent: string;
  recipient: string;
  isVideo: boolean;
  isImg: boolean;
  isAudio: boolean;
  isLoc:boolean;
}

export default function Search() {
  const navigate = useNavigate();
  const pageSize = 6;
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const totalPages = Math.ceil(totalCount / pageSize);
  const userId = localStorage.getItem("userId");
  const [pageination, setPageination] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchOption, setSearchOption] = useState("users"); // State for selected search option

  const fetchUsers = () => {
    setLoading(true);
    api
      .get(
        `/User/getUserList?page=${pageination}&pageSize=${pageSize}&search=${searchTerm}`,
        {
          headers: {
            userId,
          },
        }
      )
      .then((res) => {
        setUsers(res.data.users);
        setTotalCount(res.data.totalCount);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchMessages = () => {
    setLoading(true);
    api
      .get(
        `/Message/getMessageList?page=${pageination}&pageSize=${pageSize}&search=${searchTerm}`,
        {
          headers: {
            userId,
          },
        }
      )
      .then((res) => {
        setMessages(res.data.messages);
        setTotalCount(res.data.totalCount);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchUsersByMobile = () => {
    setLoading(true);
    api
      .get(
        `/User/getUserMobileList?page=${pageination}&pageSize=${pageSize}&search=${searchTerm}`,
        {
          headers: {
            userId,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.users);
        setTotalCount(res.data.totalCount);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!searchOption) return; // جلوگیری از اجرای زمانی که گزینه انتخاب نشده است

    setLoading(true);
    if (searchOption === "users") {
      fetchUsers();
    } else if (searchOption === "chat") {
      fetchMessages();
    } else if (searchOption === "mobile") {
      fetchUsersByMobile();
    }
  }, [pageination, searchOption, searchTerm]);

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full h-screen flex p-5">
      <div className="flex flex-wrap w-2/3 mx-auto justify-between image-bg-login max-h-full h-4/3 my-auto rounded-lg p-5 overflow-auto ">
        <span
          onClick={() => {
            navigate("/Admin");
          }}
          className="text-black text-2xl p-2 rounded-full border cursor-pointer hover:bg-gray-300 duration-300 h-11"
        >
          <IoMdArrowRoundBack />
        </span>
        <Fade className="w-11/12 pb-5" delay={200}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPageination(1); // Reset to page 1 on new search
            }}
          >
            <div
              dir="rtl"
              className="w-full flex items-center bg-white rounded-xl md:p-6 p-3 border border-gray-300"
            >
              <span className="text-3xl ml-2">
                <FcSearch />
              </span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="عبارت مورد نظر خود را وارد کنید"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
          </form>
        </Fade>
        <Fade delay={300} className="w-full">
          <div className="flex items-center justify-between mb-10 pb-32 mx-4">
            <div className="flex bg-gray-200 border-none rounded-2xl items-center px-5 py-2 text-base font-black">
              <input
                id="search-users"
                type="radio"
                name="searchOption"
                checked={searchOption === "users"}
                onChange={() => setSearchOption("users")}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="search-users"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
              >
                جست و جو در کاربران
              </label>
            </div>
            <div className="flex bg-gray-200 border-none rounded-2xl items-center px-5 py-2 text-base font-black">
              <input
                id="search-chat"
                type="radio"
                name="searchOption"
                checked={searchOption === "chat"}
                onChange={() => setSearchOption("chat")}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="search-chat"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
              >
                جست و جو در محتوای چت ها
              </label>
            </div>
            <div className="flex bg-gray-200 border-none rounded-2xl items-center px-5 py-2 text-base font-black">
              <input
                id="search-mobile"
                type="radio"
                name="searchOption"
                checked={searchOption === "mobile"}
                onChange={() => setSearchOption("mobile")}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="search-mobile"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
              >
                جست و جو در‌ شماره‌تلفن
              </label>
            </div>
          </div>
        </Fade>
        {loading ? (
          <Loader />
        ) : (
          <>
            {totalPages > 1 && (
              <div className="flex justify-center my-4">
                {pageination > 1 && (
                  <button
                    onClick={() =>
                      setPageination((prev) => Math.max(prev - 1, 1))
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600"
                  >
                    قبلی
                  </button>
                )}
                <span className="px-4 py-2 text-gray-700">
                  {pageination} / {totalPages}
                </span>
                {pageination < totalPages && (
                  <button
                    onClick={() =>
                      setPageination((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                  >
                    بعدی
                  </button>
                )}
              </div>
            )}

            {searchOption === "users" &&
              users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-gray-200 p-5 rounded-md w-full my-2"
                >
                  <div className="font-bold text-xl cursor-auto hover:scale-105 duration-300">
                    <span>{user.mobile}</span>
                  </div>
                  <div className="text-center font-bold text-xl">
                    <h4>{user.fullname}</h4>
                    <p>{user.username}</p>
                  </div>
                  <img
                    src={
                      user.avatar
                        ? `https://195.191.45.56:5155/uploads/${user.avatar}`
                        : bgUser
                    }
                    className="md:w-16 md:h-16 w-5 h-5 rounded-full border-double border-green-300 border-2 flex items-center"
                  />
                </div>
              ))}

            {searchOption === "chat" && (
              <div className="overflow-auto w-full">
                {/* نمایش جدول محتوای متنی تنها زمانی که داده‌ای وجود دارد */}
                {messages.some(
                  (message) =>
                    !message.isFiles &&
                    !message.isAudio &&
                    !message.isImg &&
                    !message.isVideo&&
                    !message.isLoc
                ) && (
                  <>
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg mb-4">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b-2 border-gray-300 text-left font-semibold text-gray-700">
                            فرستنده
                          </th>
                          <th className="py-2 px-4 border-b-2 border-gray-300 text-left font-semibold text-gray-700">
                            گیرنده
                          </th>
                          <th className="py-2 px-4 border-b-2 border-gray-300 text-left font-semibold text-gray-700">
                            محتوا
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.map(
                          (message, i) =>
                            !message.isFiles &&
                            !message.isAudio &&
                            !message.isImg &&
                            !message.isLoc&&
                            !message.isVideo && (
                              <tr key={i} className="even:bg-gray-100">
                                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                                  {message.sender}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                                  {message.recipient}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                                  {message.userContent}
                                </td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  </>
                )}

                {/* نمایش جدول فایل‌ها تنها زمانی که داده‌ای وجود دارد */}
                {messages.some(
                  (message) =>
                    message.isFiles ||
                    message.isAudio ||
                    message.isImg ||
                    message.isVideo||
                    message.isLoc
                ) && (
                  <>
                    <h2 className="text-2xl font-bold text-right p-2 my-2 border-b-2">
                      :انواع فایل ها
                    </h2>
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b-2 border-gray-300 text-left font-semibold text-gray-700">
                            فرستنده
                          </th>
                          <th className="py-2 px-4 border-b-2 border-gray-300 text-left font-semibold text-gray-700">
                            گیرنده
                          </th>
                          <th className="py-2 px-4 border-b-2 border-gray-300 text-left font-semibold text-gray-700">
                            نوع محتوا
                          </th>
                          <th className="py-2 px-4 border-b-2 border-gray-300 text-left font-semibold text-gray-700">
                            لینک محتوا
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.map((message, i) => (
                          <tr
                            key={i}
                            className={` ${
                              message.isFiles
                                ? "bg-red-200" // قرمز کم‌رنگ برای فایل
                                : message.isImg
                                ? "bg-yellow-200" // زرد کم‌رنگ برای تصویر
                                : message.isAudio
                                ? "bg-green-200" // سبز کم‌رنگ برای صدا
                                : message.isVideo
                                ? "bg-blue-200" // آبی کم‌رنگ برای ویدیو
                                : message.isLoc?"bg-green-200":""
                            }`}
                          >
                            <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                              {message.sender}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                              {message.recipient}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                              {message.isFiles
                                ? "فایل"
                                : message.isImg
                                ? "تصویر"
                                : message.isAudio
                                ? "صدا"
                                : message.isLoc
                                ? "موقعیت مکانی"
                                : message.isVideo
                                ? "ویدیو"
                                : ""}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-300 text-gray-800">
                              <a
                                href={message.userContent}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaExternalLinkAlt className="text-blue-500" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            )}

            {searchOption === "mobile" &&
              users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-gray-200 p-5 rounded-md w-full my-2"
                >
                  <div className="font-bold text-xl cursor-auto hover:scale-105 duration-300">
                    <span>{user.mobile}</span>
                  </div>
                  <div className="text-center font-bold text-xl">
                    <h4>{user.fullname}</h4>
                    <p>{user.username}</p>
                  </div>
                  <img
                    src={
                      user.avatar
                        ? `https://195.191.45.56:5155/uploads/${user.avatar}`
                        : bgUser
                    }
                    className="md:w-16 md:h-16 w-5 h-5 rounded-full border-double border-green-300 border-2"
                  />
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
