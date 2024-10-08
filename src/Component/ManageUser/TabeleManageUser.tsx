import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function TabeleManageUser() {
  const navigate = useNavigate();
  const id = 5;
  const deleteItem = () => {
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
        Swal.fire({
          title: "کاربر با موفقیت حذف شد",
          icon: "success",
        });
    });
  };
  return (
    <div>
      <div
        dir="rtl"
        className="relative overflow-x-auto shadow-md sm:rounded-lg w-full"
      >
        <table className="w-full  text-gray-500">
          <thead className="text-base font-bold text-gray-800  bg-blue-100">
            <tr>
              <th scope="col" className="md:px-6 px-3 py-3">
                شناسه
              </th>
              <th scope="col" className="md:px-6 px-3 py-3">
                نام کامل
              </th>
              <th scope="col" className="md:px-6 px-3 py-3">
                نام کاربری
              </th>
              <th scope="col" className="md:px-6 px-3 py-3">
                کاربردها
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white text-center border-b hover:bg-gray-50">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                15
              </th>
              <td className="md:px-6 px-3 py-4">احسان مددی</td>
              <td className="md:px-6 px-3 py-4">ehsan</td>
              <td className="md:px-6 px-3 py-4">
                <div className="flex items-center justify-center">
                  <span  onClick={deleteItem} className="text-red-600 cursor-pointer  hover:text-white text-2xl border rounded-full p-2 border-red-400 hover:bg-red-400 duration-200">
                    <MdDeleteForever />
                  </span>
                  <span
                    onClick={() => {
                      navigate(`/Admin/ManageUser/edit/${id}`);
                    }}
                    className="text-green-600 cursor-pointer  text-2xl border rounded-full p-2 border-green-400  hover:text-white hover:bg-green-400 mx-2 duration-200"
                  >
                    <CiEdit />
                  </span>
                  <span className="text-blue-600 cursor-pointer hover:bg-blue-400 border rounded-full border-blue-300 p-2 text-2xl  hover:text-white">
                    <MdOutlineManageAccounts />
                  </span>
                </div>
              </td>
            </tr>
            <tr className="bg-white text-center border-b hover:bg-gray-50">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                15
              </th>
              <td className="px-6 py-4">احسان مددی</td>
              <td className="px-6 py-4">ehsan</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                  <span  onClick={deleteItem} className="text-red-600 cursor-pointer  hover:text-white text-2xl border rounded-full p-2 border-red-400 hover:bg-red-400 duration-200">
                    <MdDeleteForever />
                  </span>
                  <span
                    onClick={() => {
                      navigate(`/Admin/ManageUser/edit/${id}`);
                    }}
                    className="text-green-600 cursor-pointer  text-2xl border rounded-full p-2 border-green-400  hover:text-white hover:bg-green-400 mx-2 duration-200"
                  >
                    <CiEdit />
                  </span>
                  <span className="text-blue-600 cursor-pointer hover:bg-blue-400 border rounded-full border-blue-300 p-2 text-2xl  hover:text-white">
                    <MdOutlineManageAccounts />
                  </span>
                </div>
              </td>
            </tr>
            <tr className="bg-white text-center border-b hover:bg-gray-50">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                15
              </th>
              <td className="px-6 py-4">احسان مددی</td>
              <td className="px-6 py-4">ehsan</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                  <span  onClick={deleteItem} className="text-red-600 cursor-pointer  hover:text-white text-2xl border rounded-full p-2 border-red-400 hover:bg-red-400 duration-200">
                    <MdDeleteForever />
                  </span>
                  <span
                    onClick={() => {
                      navigate(`/Admin/ManageUser/edit/${id}`);
                    }}
                    className="text-green-600 cursor-pointer  text-2xl border rounded-full p-2 border-green-400  hover:text-white hover:bg-green-400 mx-2 duration-200"
                  >
                    <CiEdit />
                  </span>
                  <span className="text-blue-600 cursor-pointer hover:bg-blue-400 border rounded-full border-blue-300 p-2 text-2xl  hover:text-white">
                    <MdOutlineManageAccounts />
                  </span>
                </div>
              </td>
            </tr>
            <tr className="bg-white text-center border-b hover:bg-gray-50">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                15
              </th>
              <td className="px-6 py-4">احسان مددی</td>
              <td className="px-6 py-4">ehsan</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                  <span className="text-red-600 cursor-pointer  hover:text-white text-2xl border rounded-full p-2 border-red-400 hover:bg-red-400 duration-200">
                    <MdDeleteForever />
                  </span>
                  <span
                    onClick={() => {
                      navigate(`/Admin/ManageUser/edit/${id}`);
                    }}
                    className="text-green-600 cursor-pointer  text-2xl border rounded-full p-2 border-green-400  hover:text-white hover:bg-green-400 mx-2 duration-200"
                  >
                    <CiEdit />
                  </span>
                  <span className="text-blue-600 cursor-pointer hover:bg-blue-400 border rounded-full border-blue-300 p-2 text-2xl  hover:text-white">
                    <MdOutlineManageAccounts />
                  </span>
                </div>
              </td>
            </tr>
            <tr className="bg-white text-center border-b hover:bg-gray-50">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                15
              </th>
              <td className="px-6 py-4">احسان مددی</td>
              <td className="px-6 py-4">ehsan</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                  <span
                    onClick={deleteItem}
                    className="text-red-600 cursor-pointer  hover:text-white text-2xl border rounded-full p-2 border-red-400 hover:bg-red-400 duration-200"
                  >
                    <MdDeleteForever />
                  </span>
                  <span
                    onClick={() => {
                      navigate(`/Admin/ManageUser/edit/${id}`);
                    }}
                    className="text-green-600 cursor-pointer  text-2xl border rounded-full p-2 border-green-400  hover:text-white hover:bg-green-400 mx-2 duration-200"
                  >
                    <CiEdit />
                  </span>
                  <span className="text-blue-600 cursor-pointer hover:bg-blue-400 border rounded-full border-blue-300 p-2 text-2xl  hover:text-white">
                    <MdOutlineManageAccounts />
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
