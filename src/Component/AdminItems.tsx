import React from "react";
import { useNavigate } from "react-router-dom";
interface MobileItemProps {
  icon: any;
  color: string;
  header: string;
  discription: string;
  href: string;
}

export default function AdminItems({
  icon,
  color,
  header,
  discription,
  href,
}: MobileItemProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`${href}`);
      }}
      className="flex p-10 flex-col items-center justify-center rounded-lg text-white"
      style={{ backgroundColor: color }}
    >
      <div className="my-3">
        <span className="text-6xl">{icon}</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{header}</h3>
      </div>
      <div>
        <p className=" text-base">{discription}</p>
      </div>
    </div>
  );
}
