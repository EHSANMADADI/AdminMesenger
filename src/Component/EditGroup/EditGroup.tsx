import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import FormEditGroup from "./FormEditGroup";
import { Fade } from "react-awesome-reveal";

export default function EditGroup() {
  const navigate = useNavigate();
  // const { GroupId } = useParams();
  // const userId = localStorage.getItem("userId");
  // useEffect(() => {
  //   api
  //     .get(`/Admin/getGroupMemberCount/${GroupId}`, {
  //       headers: {
  //         userId,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data) {

  //       }
  //     })
  //     .catch((err) => {
  //       Swal.fire({
  //         title: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
  //         icon: "error",
  //       });

  //       navigate("/Admin/AddGroup");
  //     });
  // }, []);
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full h-screen flex">
      <div className="flex flex-wrap w-2/3 mx-auto justify-between image-bg-login max-h-full h-4/3 my-auto rounded-lg p-5 overflow-auto">
        <span
          onClick={() => {
            navigate("/Admin/AddGroup");
          }}
          className="text-black text-2xl p-2 rounded-full border cursor-pointer hover:bg-gray-300 duration-300 h-11"
        >
          <IoMdArrowRoundBack />
        </span>

        <Fade delay={200} className="w-full flex flex-col justify-end">
          <div className="w-full mb-5">
            <FormEditGroup />
          </div>
        </Fade>
      </div>
    </div>
  );
}
