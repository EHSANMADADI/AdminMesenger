/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import bgUser from "../Image/none.jpg";
export default function UserUi() {
  return (
    <div className="mr-5">
      <div className="flex  items-center border-2 my-2 md:w-2/5 w-full p-1 rounded-md cursor-pointer hover:bg-gray-200 duration-200 hover:scale-105">
        <input
          type="checkbox"
          className=" rounded-full md:w-5 mx-3 md:h-5 w-3 h-3"
          name="user"
        />
        <span className="rounded-full mx-3">
          <img
            src={bgUser}
            className="md:w-10 md:h-10 w-5 h-5 rounded-full border-double border-green-300 border-2"
          />
        </span>
        <span className="font-bold md:text-lg text-sm">احسان مددی </span>
      </div>

      <div className="flex  items-center border-2 my-2 md:w-2/5 w-full p-1 rounded-md cursor-pointer hover:bg-gray-200 duration-200 hover:scale-105">
        <input
          type="checkbox"
          className=" rounded-full md:w-5 mx-3 md:h-5 w-3 h-3"
          name="user"
        />
        <span className="rounded-full mx-3">
          <img
            src={bgUser}
            className="md:w-10 md:h-10 w-5 h-5 rounded-full border-double border-green-300 border-2"
          />
        </span>
        <span className="font-bold md:text-lg text-sm">احسان مددی </span>
      </div>
    </div>
  );
}
