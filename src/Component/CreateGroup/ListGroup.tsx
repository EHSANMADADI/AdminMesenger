/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { CiBookmarkRemove } from "react-icons/ci";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../Config/api";
import none from "../../Image/none.jpg";
import Swal from "sweetalert2";
interface Group {
  id: number;
  fullname: string;
  avatar: string;
}
export default function ListGroup() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchGroup = () => {
    setLoading(true);
    api
      .get("/Admin/listAllGroups", {
        headers: {
          userId,
        },
      })
      .then((res) => {
        console.log(res.data);
        setGroups(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchGroup()
  }, []);
  const handelDelet = (id: number) => {
    Swal.fire({
      title: "آیا میخواهید این گروه را حذف کنید؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    }).then((res) => {
      if (res.isConfirmed)
        api
          .delete(`Admin/deleteGroup/${id}`, {
            headers: {
              userId,
            },
          })
          .then((res) => {
            Swal.fire({
              title: "گروه با موفقیت حذف شد",
              icon: "success",
            });
            // Fetch updated user list after successful deletion
            fetchGroup();
          })
          .catch((err) => {
            console.log("deletgroupEroor=>", err.message);
            Swal.fire({
              title: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
              icon: "error",
            });
          });
    });
  };
  return (
    <div className="w-full">
      <div>
        <h2 className="font-black border-b-2 p-2 mr-2 text-xl">
          :لیست گروه های موجود
        </h2>

        {groups &&
          groups.map((group, i) => (
            <div
              dir="rtl"
              className="flex items-center justify-between bg-gray-200 hover:bg-slate-300 duration-200 rounded-lg hover:text-white p-2 my-3 cursor-pointer"
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

              <div className="flex items-center ">
                <span
                  onClick={() => {
                    navigate(`/Admin/EditGroup/${group.id}`);
                  }}
                  className="text-blue-500 text-2xl hover:bg-blue-100 duration-200 rounded-full p-3"
                >
                  <MdEditSquare />
                </span>
                <span
                  onClick={() => handelDelet(group.id)}
                  className="text-red-500 text-2xl hover:bg-red-100 duration-200 rounded-full p-3"
                >
                  <CiBookmarkRemove />
                </span>
              </div>
            </div>
          ))}
        {!groups && (
          <div className="flex items-center justify-center">
            گروهی موجود نیست
          </div>
        )}
      </div>
    </div>
  );
}
