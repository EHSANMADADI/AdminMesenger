import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../Config/api";
import { useStore } from "../../Store/Store";
import noneAvatar from "../../Image/none.jpg";
import Loader from "../Loader";

// Define the User interface
interface User {
  id: number;
  avatar: string;
  fullname: string;
  username: string;
}

export default function TabeleManageUser() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [pageination, setPageination] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0); // Track total number of users
  const [loading, setLoading] = useState(true); // New loading state
  const pageSize = 6; // Number of users per page

  const deleteItem = (id: any) => {
    Swal.fire({
      title: "آیا میخواهید این کاربر را حذف کنید؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    }).then((res) => {
      if (res.isConfirmed)
        api
          .delete(`Admin/deleteUser/${id}`, {
            headers: {
              userId,
            },
          })
          .then((res) => {
            Swal.fire({
              title: "کاربر با موفقیت حذف شد",
              icon: "success",
            });
            // Fetch updated user list after successful deletion
            fetchUsers();
          })
          .catch((err) => {
            console.log("deletuserEroor=>", err.message);
            Swal.fire({
              title: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
              icon: "error",
            });
          });
    });
  };

  const fetchUsers = () => {
    setLoading(true); // Set loading to true before fetching
    api
      .get(`/User/getUserList?page=${pageination}&pageSize=${pageSize}`, {
        headers: {
          userId,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        setTotalCount(res.data.totalCount); // Set total count from response
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [pageination, userId]); // Added userId and pageination to the dependency array

  const totalPages = Math.ceil(totalCount / pageSize); // Calculate total pages

  return (
    <>
      {loading ? ( // Show Loader when loading
        <Loader />
      ) : (
        <div>
          <div
            dir="rtl"
            className="relative overflow-x-auto shadow-md sm:rounded-lg w-full"
          >
            <table className="w-full text-gray-500">
              <thead className="text-base font-bold text-gray-800 bg-blue-100">
                <tr>
                  <th scope="col" className="md:px-6 px-3 py-3">شناسه</th>
                  <th scope="col" className="md:px-6 px-3 py-3">تصویر نمایه</th>
                  <th scope="col" className="md:px-6 px-3 py-3">نام کامل</th>
                  <th scope="col" className="md:px-6 px-3 py-3">نام کاربری</th>
                  <th scope="col" className="md:px-6 px-3 py-3">کاربردها</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="bg-white text-center border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.id}
                    </th>
                    <td className="md:px-6 px-3 py-4">
                      {user.avatar ? (
                        <img
                          className="m-2 w-14 h-14 mx-auto border-2 bg-gray-300 border-gray-400 rounded-full"
                          src={`https://195.191.45.56:5155/uploads/${user.avatar}`}
                        />
                      ) : (
                        <img
                          className="m-2 w-14 h-14 mx-auto border-2 bg-gray-300 border-gray-400 rounded-full"
                          src={noneAvatar}
                        />
                      )}
                    </td>
                    <td className="md:px-6 px-3 py-4">{user.fullname}</td>
                    <td className="md:px-6 px-3 py-4">{user.username}</td>
                    <td className="md:px-6 px-3 py-4">
                      <div className="flex items-center justify-center">
                        <span
                          onClick={() => deleteItem(user.id)}
                          className="text-red-600 cursor-pointer hover:text-white text-2xl border rounded-full p-2 border-red-400 hover:bg-red-400 duration-200"
                        >
                          <MdDeleteForever />
                        </span>
                        <span
                          onClick={() => {
                            navigate(`/Admin/ManageUser/edit/${user.id}`, {
                              state: { userData: user },
                            });
                          }}
                          className="text-green-600 cursor-pointer text-2xl border rounded-full p-2 border-green-400 hover:text-white hover:bg-green-400 mx-2 duration-200"
                        >
                          <CiEdit />
                        </span>
                        <span className="text-blue-600 cursor-pointer hover:bg-blue-400 border rounded-full border-blue-300 p-2 text-2xl hover:text-white">
                          <MdOutlineManageAccounts />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            {pageination > 1 && (
              <button
                onClick={() => setPageination((prev) => Math.max(prev - 1, 1))}
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
                onClick={() => setPageination((prev) => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
              >
                بعدی
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
