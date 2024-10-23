/* eslint-disable jsx-a11y/alt-text */

import { useEffect, useState } from "react";
import UserUi from "./UserUi";
import api from "../../Config/api";
import Loader from "../Loader";
import Loadinggif from "../../Image/loader/loader.gif";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
interface User {
  id: number;
  avatar: string;
  fullname: string;
  username: string;
}
export default function UserUiList() {
  const pageSize = 6; // Number of users per page
  const [pageination, setPageination] = useState(1);
  const userId = localStorage.getItem("userId");
  const [totalCount, setTotalCount] = useState(0); // Track total number of users
  const [loading, setLoading] = useState(true); // New loading state
  const [users, setUsers] = useState<User[]>([]);
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
        console.log(res.data);

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
      {loading ? (
        <div className="flex   justify-center items-center">
          <img src={Loadinggif} className="bg-transparent w-32 h-32" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {users.map((user) => {
              return (
                <UserUi
                  fullname={user.fullname}
                  avatar={user.avatar}
                  id={user.id}
                />
              );
            })}
          </div>
          <div className="flex justify-center mt-4">
            {pageination < totalPages && (
              <button
                onClick={() =>
                  setPageination((prev) => Math.min(prev + 1, totalPages))
                }
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <FaAnglesRight/>
              </button>
            )}
            <span className="px-4 py-2 text-gray-700">
              {totalPages}--{pageination}
            </span>
            {pageination > 1 && (
              <button
                onClick={() => setPageination((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <FaAnglesLeft/>
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
