import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { useStore } from "../../Store/Store";
const StorageType = () => {
  const [isOpenServer, setIsOpenServer] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenIncription, setIsOpenIncription] = useState(false);
  const [isOpenFullIncription, setIsOpenFullIncription] = useState(false);
  /////////////////////////
  const [server, setServer] = useState("");
  const [user, setUser] = useState("");
  const [incription, setIncription] = useState("");
  const [fullIncription, setFullIncription] = useState("");
  const{listTypeOfseve,setListTypeOfseve}=useStore();
  const addsaveType=()=>{
    const saveType=`در سمت سرور  ${server} --در سمت کاربر  ${user} ---رمزنگاری ${incription} --- رمزنگاری کامل ${fullIncription} `
    setListTypeOfseve(saveType)
    setServer("");
    setUser("");
    setFullIncription('');
    setIncription("");
  }

  return (
    <div className=" my-5 w-full bg-white rounded-md p-5 flex items-center justify-between">
      <div className="relative flex ">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setIsOpenServer(!isOpenServer);
          }}
        >
          <h4 className="text-lg font-bold">
            سمت سرور
            {server && " - " + server}
          </h4>
          <span className="mx-2 cursor-pointer">
            <FaAngleDown />
          </span>
        </div>

        {isOpenServer && (
          <div className="absolute top-full left-0 mt-2 border bg-gray-200 flex flex-col z-10">
            <span
              onClick={() => {
                setServer("ذخیره شود");
                setIsOpenServer(!isOpenServer);
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100 "
            >
              ذخیره شود
            </span>
            <span
              onClick={() => {
                setServer("ذخیره نشود");
                setIsOpenServer(!isOpenServer);
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer "
            >
              ذخیره نشود
            </span>
          </div>
        )}
      </div>

      <div className="relative flex ">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setIsOpenUser(!isOpenUser);
          }}
        >
          <h4 className="text-lg font-bold">
            سمت کاربر
            {user && " - " + user}
          </h4>
          <span className="mx-2 cursor-pointer">
            <FaAngleDown />
          </span>
        </div>

        {isOpenUser && (
          <div className="absolute top-full left-0 mt-2 border bg-gray-100 flex flex-col z-10">
            <span
              onClick={() => {
                setUser("ذخیره شود");
                setIsOpenUser(!isOpenUser);
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100 "
            >
              ذخیره شود
            </span>
            <span
              onClick={() => {
                setUser("ذخیره نشود");
                setIsOpenUser(!isOpenUser);
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer "
            >
              ذخیره نشود
            </span>
          </div>
        )}
      </div>

      <div className="relative flex ">
        <div className="flex items-center cursor-pointer"  onClick={() => {
              setIsOpenIncription(!isOpenIncription);
            }}>
          <h4 className="text-lg font-bold">
            رمز گذاری
            {incription && " - " + incription}
          </h4>
          <span
           
            className="mx-2 cursor-pointer"
          >
            <FaAngleDown />
          </span>
        </div>

        {isOpenIncription && (
          <div className="absolute top-full left-0 mt-2 border bg-gray-100 flex flex-col z-10">
            <span
              onClick={() => {
                setIncription("انجام شود");
                setIsOpenIncription(!isOpenIncription);
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100 "
            >
              انجام شود
            </span>
            <span
              onClick={() => {
                setIncription("انجام نشود");
                setIsOpenIncription(!isOpenIncription);
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer "
            >
              انجام نشود
            </span>
          </div>
        )}
      </div>

      <div className="relative flex ">
        <div className="flex items-center cursor-pointer"   onClick={() => {
              setIsOpenFullIncription(!isOpenFullIncription);
            }}>
          <h4 className="text-lg font-bold">رمز گذاری کامل 
          {fullIncription && " - " + fullIncription}
          </h4>
          <span
          
            className="mx-2 cursor-pointer"
          >
            <FaAngleDown />
          </span>
        </div>

        {isOpenFullIncription && (
          <div className="absolute top-full left-0 mt-2 border bg-gray-100 flex flex-col z-10">
            <span onClick={()=>{setIsOpenFullIncription(!isOpenFullIncription); setFullIncription('انجام شود')}} className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100 ">
              انجام شود
            </span>
            <span onClick={()=>{setIsOpenFullIncription(!isOpenFullIncription); setFullIncription('انجام نشود')}} className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer ">
              انجام نشود
            </span>
          </div>
        )}
      </div>

      <div className="flex" onClick={addsaveType}>
        <span className="p-2 border rounded-full cursor-pointer hover:bg-green-500 text-xl hover:text-white duration-200">
          <IoAdd />
        </span>
      </div>
    </div>
  );
};

export default StorageType;
