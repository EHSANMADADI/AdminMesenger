import React from 'react'
import AdminItems from '../Component/AdminItems'
import { FaUsersViewfinder } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import { TbLockFilled } from "react-icons/tb";
import { SiSearxng } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
export default function AdminFerstPage() {
    return (
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full h-screen flex">
            <div className='flex flex-wrap w-2/3 mx-auto image-bg-login max-h-full h-4/3 my-auto rounded-lg justify-between p-5 overflow-scroll '>
                <div className='flex justify-center w-full m-5 text-xl font-black border-b-2 p-2'>نام ادمین</div>
                <div className='md:w-5/12 w-full my-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
                    <AdminItems color='DeepSkyBlue' icon={<IoPersonAddOutline />} header='ثبت کاربر جدید' discription='ثبت کاربر جدید در سیستم با ویژگی های مختلف' />
                </div>
                <div className='md:w-5/12 w-full my-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
                    <AdminItems color='Orange' icon={<FaUsersViewfinder />} header='مدیریت کاربران' discription='مشاهده و مدیریت لیست کاربران ثبت شده' />
                </div>
                <div className='md:w-5/12 w-full my-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
                    <AdminItems color='Orange' icon={<TbLockFilled />} header='تایین سطح دسترسی' discription='ایجاد دسترسی عمومی برای مخاطبین' />
                </div>
                <div className='md:w-5/12 w-full my-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
                    <AdminItems color='Tomato' icon={<SiSearxng />} header='جست و جو در محتوا' discription='جست و جو در محتوای تمام چت ها' />
                </div>
                <div className='md:w-5/12 w-full my-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
                    <AdminItems color='RebeccaPurple' icon={<CiLogout />} header='خروج از سیستم' discription='برای خروج از این گزینه استفاده کنید' />
                </div>
                <div className='md:w-5/12 w-full my-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
                    <AdminItems color='ForestGreen' icon={<FaUsers />} header='ساخت و مدیریت گروه' />
                </div>



            </div>

        </div>
    )
}
