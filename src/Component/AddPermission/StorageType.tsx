import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { useStore } from "../../Store/Store";
import Swal from "sweetalert2";
const StorageType = () => {
  const [isOpenServer, setIsOpenServer] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenIncription, setIsOpenIncription] = useState(false);
  const [isOpenFullIncription, setIsOpenFullIncription] = useState(false);
  /////////////////////////
  // const [idTable, setIdTable] = useState(0);
  const [server, setServer] = useState("");
  const [user, setUser] = useState("");
  const [incription, setIncription] = useState("");
  const [fullIncription, setFullIncription] = useState("");
  const {
    saveTypeIds,
    setSaveTypeIds,
    setDefaultSaveType,
    defaultSaveType,
    setListTypeOfseve,
    idTable,
    setIdTable
  } = useStore();
  const addsaveType = () => {
    const saveType =
      `در سمت سرور ${server} -- در سمت کاربر ${user} --- رمزنگاری ${incription} --- رمزنگاری کامل ${fullIncription} `.trim();
    console.log(saveType);

    switch (saveType) {
      case "در سمت سرور ذخیره نشود -- در سمت کاربر ذخیره نشود --- رمزنگاری انجام نشود --- رمزنگاری کامل انجام نشود":
        setIdTable(1);
        defaultSaveType === 0 ? setDefaultSaveType(1) : setSaveTypeIds(1);

        break;
      case "در سمت سرور ذخیره نشود -- در سمت کاربر ذخیره شود --- رمزنگاری انجام نشود --- رمزنگاری کامل انجام نشود":
        setIdTable(2);
        defaultSaveType === 0 ? setDefaultSaveType(2) : setSaveTypeIds(2);
        break;
      case "در سمت سرور ذخیره نشود -- در سمت کاربر ذخیره شود --- رمزنگاری سمت سرور انجام شود --- رمزنگاری کامل انجام نشود":
        setIdTable(3);
        defaultSaveType === 0 ? setDefaultSaveType(3) : setSaveTypeIds(3);
        break;
      case "در سمت سرور ذخیره نشود -- در سمت کاربر ذخیره شود --- رمزنگاری انجام نشود --- رمزنگاری کامل سمت کاربر انجام شود":
        setIdTable(4);
        defaultSaveType === 0 ? setDefaultSaveType(4) : setSaveTypeIds(4);
        break;
      case "در سمت سرور ذخیره شود -- در سمت کاربر ذخیره نشود --- رمزنگاری انجام نشود --- رمزنگاری کامل انجام نشود":
        setIdTable(5);
        defaultSaveType === 0 ? setDefaultSaveType(5) : setSaveTypeIds(5);
        break;
      case "در سمت سرور ذخیره شود -- در سمت کاربر ذخیره شود --- رمزنگاری انجام نشود --- رمزنگاری کامل انجام نشود":
        setIdTable(6);
        defaultSaveType === 0 ? setDefaultSaveType(6) : setSaveTypeIds(6);
        break;
      case "در سمت سرور ذخیره شود -- در سمت کاربر ذخیره شود --- رمزنگاری سمت کاربر انجام شود --- رمزنگاری کامل انجام نشود": ///client
        setIdTable(7);
        defaultSaveType === 0 ? setDefaultSaveType(7) : setSaveTypeIds(7);
        break;
      case "در سمت سرور ذخیره شود -- در سمت کاربر ذخیره شود --- رمزنگاری انجام نشود --- رمزنگاری کامل سمت کاربر انجام شود":
        setIdTable(8);
        defaultSaveType === 0 ? setDefaultSaveType(8) : setSaveTypeIds(8);
        break;
      case "در سمت سرور ذخیره شود -- در سمت کاربر ذخیره نشود --- رمزنگاری سمت سرور انجام شود --- رمزنگاری کامل انجام نشود":
        setIdTable(9); ///
        defaultSaveType === 0 ? setDefaultSaveType(9) : setSaveTypeIds(9);
        break;
      case "در سمت سرور ذخیره شود -- در سمت کاربر ذخیره شود --- رمزنگاری سمت سرور انجام شود --- رمزنگاری کامل انجام نشود": ///server
        setIdTable(10);
        defaultSaveType === 0 ? setDefaultSaveType(10) : setSaveTypeIds(10);
        break;
      case "در سمت سرور ذخیره شود -- در سمت کاربر ذخیره شود --- رمزنگاری در هر دو سمت --- رمزنگاری کامل انجام نشود": //
        setIdTable(11);
        defaultSaveType === 0 ? setDefaultSaveType(11) : setSaveTypeIds(11);
        break;
      case "در سمت سرور ذخیره شود -- در سمت کاربر ذخیره شود --- رمزنگاری سمت سرور انجام شود --- رمزنگاری کامل سمت کاربر انجام شود": //
        setIdTable(12);
        defaultSaveType === 0 ? setDefaultSaveType(12) : setSaveTypeIds(12);
        break;
      case "در سمت سرور ذخیره شود -- در سمت کاربر ذخیره نشود --- رمزنگاری انجام نشود --- رمزنگاری کامل سمت سرور انجام شود": //
        setIdTable(13);
        defaultSaveType === 0 ? setDefaultSaveType(13) : setSaveTypeIds(13);
        break;
      case "در سمت سرور ذخیره شود -- در سمت کاربر ذخیره شود --- رمزنگاری انجام نشود --- رمزنگاری کامل سمت سرور انجام شود": //
        setIdTable(14);
        defaultSaveType === 0 ? setDefaultSaveType(14) : setSaveTypeIds(14);
        break;
      case "در سمت سرور ذخیره شود -- در سمت کاربر ذخیره شود --- رمزنگاری سمت کاربر انجام شود --- رمزنگاری کامل سمت سرور انجام شود": //
        setIdTable(15);
        defaultSaveType === 0 ? setDefaultSaveType(15) : setSaveTypeIds(15);
        break;
      case "در سمت سرور ذخیره شود -- در سمت کاربر ذخیره شود --- رمزنگاری در هر دو سمت --- رمزنگاری کامل در هر دو سمت": //
        setIdTable(16);
        defaultSaveType === 0 ? setDefaultSaveType(16) : setSaveTypeIds(16);
        break;
      default:
        return Swal.fire({
          title: "این نوع ذخیره سازی امکان پذیر نمیباشد",
          icon: "error",
        });
    }
    setListTypeOfseve(saveType);
    setServer("");
    setUser("");
    setFullIncription("");
    setIncription("");
  };
  console.log(idTable);
  useEffect(()=>{
    return(()=>{
      setIdTable(0)
    })
  },[])

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
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setIsOpenIncription(!isOpenIncription);
          }}
        >
          <h4 className="text-lg font-bold">
            رمز گذاری
            {incription && " - " + incription}
          </h4>
          <span className="mx-2 cursor-pointer">
            <FaAngleDown />
          </span>
        </div>

        {isOpenIncription && (
          <div className="absolute top-full left-0 mt-2 border bg-gray-100 flex flex-col z-10">
            <span
              onClick={() => {
                setIncription("سمت سرور انجام شود");
                setIsOpenIncription(!isOpenIncription);
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100 "
            >
              سمت سرور انجام شود
            </span>

            <span
              onClick={() => {
                setIncription("سمت کاربر انجام شود");
                setIsOpenIncription(!isOpenIncription);
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100 "
            >
              سمت کاربر انجام شود
            </span>
            <span
              onClick={() => {
                setIncription("در هر دو سمت");
                setIsOpenIncription(!isOpenIncription);
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100 "
            >
              رمز نگاری در هر دو سمت
            </span>

            <span
              onClick={() => {
                setIncription("انجام نشود");
                setIsOpenIncription(!isOpenIncription);
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100 "
            >
              انجام نشود
            </span>
          </div>
        )}
      </div>

      <div className="relative flex ">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setIsOpenFullIncription(!isOpenFullIncription);
          }}
        >
          <h4 className="text-lg font-bold">
            رمز گذاری کامل
            {fullIncription && " - " + fullIncription}
          </h4>
          <span className="mx-2 cursor-pointer">
            <FaAngleDown />
          </span>
        </div>

        {isOpenFullIncription && (
          <div className="absolute top-full left-0 mt-2 border bg-gray-100 flex flex-col z-10">
            <span
              onClick={() => {
                setIsOpenFullIncription(!isOpenFullIncription);
                setFullIncription("سمت سرور انجام شود");
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100 "
            >
              سمت سرور انجام شود
            </span>
            <span
              onClick={() => {
                setIsOpenFullIncription(!isOpenFullIncription);
                setFullIncription("سمت کاربر انجام شود");
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100 "
            >
              سمت کاربر انجام شود
            </span>
            <span
              onClick={() => {
                setIsOpenFullIncription(!isOpenFullIncription);
                setFullIncription("در هر دو سمت");
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer border-b-2 border-blue-100 "
            >
              رمز نگاری کامل در هر دو سمت
            </span>
            <span
              onClick={() => {
                setIsOpenFullIncription(!isOpenFullIncription);
                setFullIncription("انجام نشود");
              }}
              className="p-3 hover:bg-white duration-300 font-semibold cursor-pointer "
            >
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
