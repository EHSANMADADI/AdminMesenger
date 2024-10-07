import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import FormAddGroup from "./FormAddGroup";
import { Fade } from "react-awesome-reveal";
import ListGroup from "./ListGroup";

export default function AddGroup() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full h-screen flex">
    <div className="flex flex-wrap w-2/3 mx-auto justify-between image-bg-login max-h-full h-4/3 my-auto rounded-lg p-5 overflow-auto">
      <span
        onClick={() => {
          navigate("/Admin");
        }}
        className="text-black text-2xl p-2 rounded-full border cursor-pointer hover:bg-gray-300 duration-300 h-11"
      >
        <IoMdArrowRoundBack />
      </span>
      <Fade delay={200} className="w-full flex flex-col justify-end">
        <div className="w-full mb-5">
          <FormAddGroup />
        </div>
        <div className="w-full text-right">
          <ListGroup />
        </div>
      </Fade>
    </div>
  </div>
  
  );
}
