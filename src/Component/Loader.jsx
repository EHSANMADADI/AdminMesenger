/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Loading from '../Image/loader/loader.gif'
export default function Loader() {
  return (
    <div className='flex w-full  justify-center items-center  h-screen'>
        <img src={Loading} className='bg-transparent'/> 

    </div>
  )
}
