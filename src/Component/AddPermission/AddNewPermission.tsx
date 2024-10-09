import React, { useState } from 'react'
import { IoAdd } from "react-icons/io5";
export default function AddNewPermission() {
    const [Permission,setPermissions] =useState('')
  return (
    <div className='flex items-center px-5 bg-white rounded-md border-2'>
        <span className='p-2 border rounded-full cursor-pointer hover:bg-green-500 text-xl hover:text-white duration-200' ><IoAdd/></span>
        <input type='text' value={Permission} onChange={(e)=>{
            const vara=e.target.value;
            setPermissions(vara)
            
        }} placeholder='ساخت دسترسی جدید' className='bg-transparent focus:outline-none p-3' />
    </div>
  )
}
