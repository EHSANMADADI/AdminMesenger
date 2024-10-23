/* eslint-disable jsx-a11y/alt-text */
import bgUser from "../../Image/none.jpg";
import { FaChevronDown } from "react-icons/fa";
import { useStore } from "../../Store/Store";
import { useState, useEffect } from "react";

interface user {
  fullname: string;
  avatar: string;
  id: number;
}

export default function UserUi({ fullname, avatar, id }: user) {
  const {
    adminList,
    setAdminList,
    removeAdminList,
    Members,
    setMembers,
    removeMembers,
  } = useStore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);

  // Check if the user is in the admin list
  useEffect(() => {
    setIsAdmin(adminList.includes(id));
  }, [adminList, id]);

  // Handle checkbox change for Members
  const handleCheckboxChange = (e: { target: { checked: any } }) => {
    if (e.target.checked) {
      // Add user to Members list
      setMembers(id);
      
    } else {
      // Remove user from Members list
      removeMembers(id);
      console.log('remove');
      
    }
  };

  return (
    <div
      className={`flex items-center justify-between border-2 my-2 w-full p-1 rounded-md cursor-pointer hover:bg-gray-200 duration-200 hover:scale-95 ${
        isAdmin ? "bg-green-200" : ""
      }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className="rounded-full md:w-5 mx-3 md:h-5 w-3 h-3"
          name="user"
          checked={Members.includes(id)}
          onChange={handleCheckboxChange}
        />

        <span className="rounded-full mx-3">
          {avatar ? (
            <img
              src={`https://195.191.45.56:5155/uploads/${avatar}`}
              className="md:w-10 md:h-10 w-5 h-5 rounded-full border-double border-green-300 border-2"
            />
          ) : (
            <img
              src={bgUser}
              className="md:w-10 md:h-10 w-5 h-5 rounded-full border-double border-green-300 border-2"
            />
          )}
        </span>
        <span className="font-bold md:text-lg text-sm">{fullname}</span>
      </div>

      <span onClick={() => setOpen(true)} className="p-1">
        <FaChevronDown />
      </span>
      {open && isAdmin && (
        <div className="absolute top-full left-0 mt-2 border bg-gray-100 flex flex-col z-10 border-b-2 border-blue-100">
          <span
            onClick={() => {
              removeAdminList(id);
              setIsAdmin(false);
              setOpen(false);
            }}
            className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100"
          >
            حذف از لیست ادمین‌های گروه
          </span>
        </div>
      )}

      {open && !isAdmin && (
        <div className="absolute top-full left-0 mt-2 border bg-gray-300 flex flex-col z-10 border-b-2 border-blue-100">
          <span
            onClick={() => {
              setIsAdmin(true);
              setOpen(false);
              setAdminList(id);
              setMembers(id)
            }}
            className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100"
          >
            افزودن به لیست ادمین‌های گروه
          </span>
        </div>
      )}
    </div>
  );
}
