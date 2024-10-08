import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
import { FcSearch } from "react-icons/fc";
export default function Search() {
    const navigate=useNavigate()
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full h-screen  flex p-5">
      <div className="flex flex-wrap w-2/3 mx-auto justify-between image-bg-login max-h-full h-4/3 my-auto rounded-lg  p-5 overflow-auto ">
        <span
          onClick={() => {
            navigate("/Admin");
          }}
          className="text-black text-2xl p-2 rounded-full border cursor-pointer hover:bg-gray-300 duration-300 h-11"
        >
          <IoMdArrowRoundBack />
        </span>
        <Fade className="w-11/12 pb-20" delay={200}>
        <div dir='rtl' className="w-full flex items-center bg-white rounded-xl p-6 border border-gray-300">
            <span className='text-3xl ml-2'><FcSearch/></span>
            <input placeholder=' عبارت مورد نظر خود را وارد کنید' className='w-full bg-transparent focus:outline-none'/>
           
        </div>
        </Fade>
       
      </div>
    </div>
  )
}
