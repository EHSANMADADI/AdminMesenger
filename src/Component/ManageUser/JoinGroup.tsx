/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import api from "../../Config/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import none from "../../Image/none.jpg";
import { IoMdArrowRoundBack } from "react-icons/io";
interface Group {
  id: number;
  fullname: string;
  mobile: string;
  username: string;
  status: boolean;
  avatar: string;
  rileName: string;
  bio: string;
}
export default function JoinGroup() {
  const navigate = useNavigate();
  const { Id } = useParams();
  const userId = localStorage.getItem("userId");

  // State variables for groups, pagination, and loading status
  const [groups, setGroups] = useState<Group[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // Fetch groups with pagination
    api
      .get(
        `/User/getJoinedGroupsList?currentUserId=${Id}&page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            userId,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setTotalCount(res.data.totalCount);
        setGroups(res.data.groups);
        setTotalPages(res.data.totalPages); // Assume the API response contains total pages
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
          icon: "error",
        });
        navigate("/Admin/ManageUser");
      });
  }, [page, Id, userId]);

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full h-screen flex">
      <div className="flex flex-wrap w-2/3 mx-auto justify-between image-bg-login max-h-full h-4/3 my-auto rounded-lg p-5 overflow-auto">
        <span
          onClick={() => {
            navigate("/Admin/ManageUser");
          }}
          className="text-black text-2xl p-2 rounded-full border cursor-pointer hover:bg-gray-300 duration-300 h-11"
        >
          <IoMdArrowRoundBack />
        </span>

        <div dir="rtl" className="w-full p-5">
          <h2 className="font-bold text-2xl border-b-2 border-dashed my-4 p-4">لیست گروه‌های کاربر</h2>
          {groups &&
            groups.map((group, i) => (
              <div
                key={i}
                dir="rtl"
                className="flex w-full mx-auto items-center justify-between bg-gray-200 hover:bg-slate-300 duration-200 rounded-lg hover:text-white p-2 my-3 cursor-pointer"
              >
                <div className="flex items-center">
                  {group.avatar && (
                    <img
                      src={`https://195.191.45.56:5155/uploads/${group.avatar}`}
                      className="md:w-10 md:h-10 w-5 h-5 rounded-full border-double border-green-300 border-2"
                    />
                  )}
                  {!group.avatar && (
                    <img
                      src={none}
                      className="md:w-10 md:h-10 w-5 h-5 rounded-full border-double border-green-300 border-2"
                    />
                  )}

                  <span className="p-2 mx-2 text-xl">{group.fullname}</span>
                </div>
              </div>
            ))}
          {groups.length===0 && (
            <div className="flex items-center justify-center">
              گروهی موجود نیست
            </div>
          )}

          {/* Pagination controls */}
          {totalCount > 10 ? (
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                صفحه قبل
              </button>
              <span>
                {" "}
                صفحه {page} از {totalPages}{" "}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                صفحه بعد
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
