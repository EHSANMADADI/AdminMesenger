import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TabeleManageUser from "./TabeleManageUser";
import { Fade } from "react-awesome-reveal";
import { FcSearch } from "react-icons/fc";
export default function ManageUser() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full h-screen  flex p-5">
      <div className="flex flex-wrap md:w-2/3 w-full mx-auto justify-between image-bg-login max-h-full h-4/3 my-auto rounded-lg  p-5 overflow-auto ">
        <span
          onClick={() => {
            navigate("/Admin");
          }}
          className="text-black text-2xl p-2 rounded-full border cursor-pointer hover:bg-gray-300 duration-300 h-11"
        >
          <IoMdArrowRoundBack />
        </span>
        <Fade className="w-11/12" delay={200}>

        
     
        <div className="w-full">
          <TabeleManageUser />
        </div>
        </Fade>
       
      </div>
    </div>
  );
}
