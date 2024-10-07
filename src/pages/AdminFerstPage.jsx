import React from 'react';
import AdminItems from '../Component/AdminItems';
import { FaUsersViewfinder } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import { TbLockFilled } from "react-icons/tb";
import { SiSearxng } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
export default function AdminFerstPage() {
    const navigate = useNavigate();
    return (
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full h-screen flex">
            <div className='flex flex-wrap w-2/3 mx-auto image-bg-login max-h-full h-4/3 my-auto rounded-lg justify-between p-5 overflow-auto '>
                <div className='flex justify-center w-full m-5 text-xl font-black border-b-2 p-2'>نام ادمین</div>
                <div className='w-full flex justify-between flex-wrap'>
                    <Fade className='md:w-5/12 w-full' delay={100}>
                        <div className=' my-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
                            <AdminItems href='/Admin/AddNewUser' color='DeepSkyBlue' icon={<IoPersonAddOutline />} header='ثبت کاربر جدید' discription='ثبت کاربر جدید در سیستم با ویژگی های مختلف' />
                        </div>
                    </Fade>

                    <Fade className='md:w-5/12 w-full' delay={200}>
                        <div className=' my-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
                            <AdminItems href='/Admin/ManageUser' color='Orange' icon={<FaUsersViewfinder />} header='مدیریت کاربران' discription='مشاهده و مدیریت لیست کاربران ثبت شده' />
                        </div>
                    </Fade>

                    <Fade className='md:w-5/12 w-full' delay={300}>
                        <div className='my-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
                            <AdminItems href='/Admin/AddPermission' color='Violet' icon={<TbLockFilled />} header='تایین سطح دسترسی' discription='ایجاد دسترسی عمومی برای مخاطبین' />
                        </div>
                    </Fade>

                    <Fade className='md:w-5/12 w-full' delay={400}>
                        <div className=' my-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
                            <AdminItems color='Tomato' icon={<SiSearxng />} header='جست و جو در محتوا' discription='جست و جو در محتوای تمام چت ها' />
                        </div>
                    </Fade>

                    <Fade className='md:w-5/12 w-full' delay={500}>
                        <div onClick={() => Swal.fire({
                            title: "میخواهید از حساب کاربری خود خارج شوید",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            cancelButtonText: "خیر",
                            confirmButtonText: "بله خارج شو"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/')
                                Swal.fire({
                                    title: "از حساب کاربری خود خارج شدید",
                                    icon: "success"
                                });
                            }
                        })} className=' my-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
                            <AdminItems href='' color='RebeccaPurple' icon={<CiLogout />} header='خروج از سیستم' discription='برای خروج از این گزینه استفاده کنید' />
                        </div>
                    </Fade>

                    <Fade className='md:w-5/12 w-full' delay={600}>
                        <div className='my-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
                            <AdminItems href='/Admin/AddGroup' discription='تعداد کاربران' color='ForestGreen' icon={<FaUsers />} header='ساخت و مدیریت گروه' />
                        </div>
                    </Fade>
                </div>

            </div>
        </div>
    );
}
